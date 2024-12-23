from datetime import datetime

from pydantic import BaseModel


class Transcription(BaseModel):
    id: int
    filename: str
    text: str
    created_at: datetime
