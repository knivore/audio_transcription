from fastapi import UploadFile
from transformers import WhisperProcessor, WhisperForConditionalGeneration


async def transcribe_audio_file(file: UploadFile) -> str:
    # Load model and processor
    processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
    model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
    model.config.forced_decoder_ids = None

    # Process audio file
    input_features = processor(file.name, return_tensors="pt").input_features

    # Generate transcription
    predicted_ids = model.generate(input_features)
    # decode token ids to text
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

    return transcription
