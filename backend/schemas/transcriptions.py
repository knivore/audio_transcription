from datetime import datetime

from pydantic import BaseModel


class Transcription(BaseModel):
    id: int
    filename: str
    transcribed_text: str
    created_at: datetime
