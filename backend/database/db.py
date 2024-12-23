import os
import sqlite3
from contextlib import contextmanager
from sqlite3 import Error

DATABASE_PATH = os.getenv('DATABASE_PATH', 'transcriptions.db')


def create_connection():
    """Create a database connection to the SQLite database."""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        return conn
    except Error as e:
        print(f"Error connecting to database: {e}")
        raise


def init_db():
    """Initialize the database with required tables."""
    sql_create_transcriptions_table = """
    CREATE TABLE IF NOT EXISTS transcriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        transcribed_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    sql_create_transcription_index = """CREATE INDEX IF NOT EXISTS idx_filename ON transcriptions(filename);"""

    try:
        conn = create_connection()
        conn.execute(sql_create_transcriptions_table)
        conn.execute(sql_create_transcription_index)
        conn.commit()
    except Error as e:
        print(f"Error creating database: {e}")
        raise
    finally:
        conn.close()


@contextmanager
def get_db():
    """Context manager for database connections."""
    conn = create_connection()
    try:
        conn.row_factory = sqlite3.Row
        yield conn
    finally:
        conn.close()
