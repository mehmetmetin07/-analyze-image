# Resim Analiz API

Bu proje, yüklenen resimleri analiz edip açıklama üreten bir FastAPI uygulamasıdır.

## Özellikler

- Resim yükleme ve analiz
- Otomatik resim açıklaması üretme
- CORS desteği
- Sağlık kontrolü endpoint'i
- Hata yönetimi

## Gereksinimler

- Python 3.8+
- FastAPI
- PyTorch
- Transformers
- Pillow

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/resim-analiz-api.git
cd resim-analiz-api
```

2. Sanal ortam oluşturun ve aktifleştirin:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Gereksinimleri yükleyin:
```bash
pip install -r requirements.txt
```

## Kullanım

Uygulamayı başlatmak için:
```bash
uvicorn main:app --reload
```

API şu endpoint'leri sunar:

- `GET /`: Ana sayfa
- `GET /health`: Sağlık kontrolü
- `POST /analyze`: Resim analizi (multipart form data ile resim yükleme)

### Örnek İstek

```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@resim.jpg"
```

### Örnek Yanıt

```json
{
  "success": true,
  "caption": "a person walking on a beach at sunset"
}
```

## Render Deployment

1. Render.com'da yeni bir web servisi oluşturun
2. Python ortamını seçin
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Lisans

MIT License 