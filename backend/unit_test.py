import pytest
from fastapi.testclient import TestClient

from app import app


@pytest.fixture
def client():
    """Fixture to create a test client."""
    return TestClient(app)


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_transcribe_invalid_file(client):
    # Simulate uploading an unsupported file type
    response = client.post(
        "/api/transcribe",
        files={"file": ("test.txt", b"dummy content", "text/plain")},
    )
    assert response.status_code == 400
    assert response.json() == {"message": "Unsupported file format"}


def test_get_transcriptions_empty(client):
    response = client.get("/api/transcriptions")
    assert response.status_code == 200
    assert response.json() == []
