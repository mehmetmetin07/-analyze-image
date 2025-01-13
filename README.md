# Resim Analiz API

Bu API, Google Cloud Vision ve Google Cloud Translate API'lerini kullanarak resimleri analiz eder ve sonuçları Türkçe'ye çevirir.

## Özellikler

- Resim analizi (Google Cloud Vision API)
- Otomatik çeviri (Google Cloud Translate API)
- Dosya yükleme desteği
- CORS desteği
- Health check endpoint'i

## Gereksinimler

- Node.js 18 veya üzeri
- Google Cloud hesabı
- Google Cloud Vision API aktif
- Google Cloud Translate API aktif
- Google Cloud Service Account anahtarı

## Kurulum

1. Repo'yu klonlayın:
```bash
git clone [REPO_URL]
cd [REPO_NAME]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Google Cloud kimlik bilgilerini ayarlayın:
- Google Cloud Console'dan bir Service Account anahtarı oluşturun
- Anahtarı `google-credentials.json` olarak kaydedin
- Ortam değişkenini ayarlayın:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
```

4. Uygulamayı başlatın:
```bash
npm start
```

## API Endpoint'leri

### GET /health
Servis durumunu kontrol eder.

### POST /analyze
Resim analizi yapar.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (resim dosyası)

**Response:**
```json
{
    "success": true,
    "data": {
        "english": "This image shows [labels]",
        "turkish": "[Türkçe çeviri]",
        "labels": [
            {
                "name": "label1",
                "confidence": 0.95
            }
        ]
    }
}
```

## Docker ile Çalıştırma

```bash
docker build -t image-analysis-api .
docker run -p 8080:8080 -v $(pwd)/google-credentials.json:/app/google-credentials.json image-analysis-api
```

## Cloud Run Deployment

```bash
gcloud run deploy analyze-image \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

## Lisans

MIT 