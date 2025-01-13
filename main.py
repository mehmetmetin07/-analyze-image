from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
from transformers import AutoModelForImageCaptioning, AutoProcessor

app = FastAPI(title="Resim Analiz API")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model yükleme
model_name = "nlpconnect/vit-gpt2-image-captioning"
model = AutoModelForImageCaptioning.from_pretrained(model_name)
processor = AutoProcessor.from_pretrained(model_name)

@app.get("/")
def read_root():
    return {"message": "Resim Analiz API'sine Hoşgeldiniz"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Resmi oku
        image = Image.open(file.file)
        
        # Resmi işle
        inputs = processor(image, return_tensors="pt")
        output = model.generate(**inputs, max_length=50)
        caption = processor.decode(output[0], skip_special_tokens=True)
        
        return {
            "success": True,
            "caption": caption
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 