from .db import get_db

class TranscriptionTable:
    @staticmethod
    def create_transcription(filename: str, transcribed_text: str) -> dict:
        """Create a new transcription record."""
        sql = """
        INSERT INTO transcriptions (filename, transcribed_text)
        VALUES (?, ?)
        RETURNING *;
        """

        with get_db() as conn:
            cursor = conn.cursor()
            result = cursor.execute(sql, (filename, transcribed_text))
            row = result.fetchone()
            conn.commit()
            return dict(row)

    @staticmethod
    def get_transcription(transcription_id: int) -> dict:
        """Get a specific transcription by ID."""
        sql = "SELECT * FROM transcriptions WHERE id = ?;"

        with get_db() as conn:
            cursor = conn.cursor()
            result = cursor.execute(sql, (transcription_id,))
            row = result.fetchone()
            return dict(row) if row else None

    @staticmethod
    def get_all_transcriptions() -> list:
        """Get all transcriptions."""
        sql = "SELECT * FROM transcriptions ORDER BY created_at DESC;"

        with get_db() as conn:
            cursor = conn.cursor()
            result = cursor.execute(sql)
            return [dict(row) for row in result.fetchall()]

    @staticmethod
    def search_transcriptions(search_term: str) -> list:
        """Search transcriptions by filename."""
        sql = """
        SELECT * FROM transcriptions 
        WHERE filename LIKE ? OR transcribed_text LIKE ?
        ORDER BY created_at DESC;
        """
        search_pattern = f"%{search_term}%"

        with get_db() as conn:
            cursor = conn.cursor()
            result = cursor.execute(sql, (search_pattern, search_pattern))
            return [dict(row) for row in result.fetchall()]
