from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, APIRouter
from fastapi import File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from database.db import init_db
from database.transcription_table import TranscriptionTable
from schemas.transcriptions import Transcription
from services import whisper


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan, title="Audio Transcription")

# Initialize Router with `/api` prefix and register it with app
api_prefix = "/api"
api_router = APIRouter()

# Define the allowed origins
origins = ["http://localhost:3000"]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "x-csrf-token"],
)


@app.get("/")
async def hello():
    return JSONResponse(content=f"Hello!", status_code=200)


@app.get("/health")
async def health_check():
    return JSONResponse(content={"status": "healthy"}, status_code=200)


@api_router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    if not file.filename.endswith(('.mp3', '.wav', '.m4a')):
        return JSONResponse(status_code=400, content={"message": "Unsupported file format"})

    try:
        transcribed_text = await whisper.transcribe_audio_file(file)

        result = TranscriptionTable.create_transcription(filename=file.filename, transcribed_text=transcribed_text)

        # Return the saved transcription
        return JSONResponse(status_code=200, content={"result": result})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@api_router.get("/transcriptions", response_model=List[Transcription])
async def get_transcriptions():
    try:
        transcriptions = TranscriptionTable.get_all_transcriptions()
        return JSONResponse(status_code=200, content={"result": transcriptions})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@api_router.get("/search")
async def search_transcriptions(query: str):
    try:
        results = TranscriptionTable.search_transcriptions(query)
        return JSONResponse(status_code=200, content={"result": results})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


app.include_router(api_router, prefix=api_prefix)
