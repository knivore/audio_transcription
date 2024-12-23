import numpy as np
import soundfile as sf
import torch
from fastapi import UploadFile
from transformers import WhisperProcessor, WhisperForConditionalGeneration


async def transcribe_audio_file(file: UploadFile) -> str:
    # Load model and processor
    processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
    model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")

    # Read audio with SoundFile
    data, fs = sf.read(file.file)

    # Normalize data
    data = data.astype(np.float32)

    # Process audio file and generate attention mask
    input_features = processor(data, return_tensors="pt", sampling_rate=16000).input_features
    attention_mask = torch.ones(input_features.shape, dtype=torch.long)  # Create a mask

    # Generate transcription with forced English language setting
    predicted_ids = model.generate(input_features, attention_mask=attention_mask, language="en")

    # decode token ids to text
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

    print(transcription)
    return transcription
