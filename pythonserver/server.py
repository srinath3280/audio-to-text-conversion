from fastapi import FastAPI, UploadFile, File, HTTPException
import tempfile
import os

from faster_whisper import WhisperModel

app = FastAPI()

# Load Whisper model
model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

@app.get("/")
async def read_root():
    return {"Message": "Welcome to the Audio to Text API. Please use the /transcribe endpoint to transcribe audio files."}

@app.post("/transcribe")
async def audio_to_text(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Audio file is required"
        )

    temp_file = None

    try:
        audio_data = await file.read()
        
        print("Received audio file:", audio_data)

        suffix = os.path.splitext(file.filename)[1]
        
        print("File suffix:", suffix)

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp:
            temp.write(audio_data)
            temp_file = temp.name

        segments, info = model.transcribe(temp_file)
        
        text = " ".join(
            segment.text.strip()
            for segment in segments
        )

        print("Audio converted to text successfully")
        print("File name:", file.filename)
        print("Language:", info.language)
        print("Info:", info)
        print("Text:", text)
        return {
            "success": True,
            "message": "Audio converted to text successfully",
            "file_name": file.filename,
            "language": info.language,
            "info": info,
            "text": text
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:

        if temp_file and os.path.exists(temp_file):
            os.remove(temp_file)

