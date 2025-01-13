const express = require('express');
const multer = require('multer');
const vision = require('@google-cloud/vision');
const { Translate } = require('@google-cloud/translate').v2;

const app = express();
const port = process.env.PORT || 8080;

// Multer ayarları
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Ana endpoint
app.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        // Dosya kontrolü
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Dosya yüklenmedi'
            });
        }

        // Vision API istemcisi
        const visionClient = new vision.ImageAnnotatorClient();
        
        // Resmi analiz et
        const [result] = await visionClient.labelDetection({
            image: { content: req.file.buffer.toString('base64') }
        });

        // Etiketleri al
        const labels = result.labelAnnotations || [];
        const topLabels = labels
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(label => label.description)
            .join(', ');

        // İngilizce açıklama
        const englishCaption = `This image shows ${topLabels}`;

        // Translate API istemcisi
        const translate = new Translate();
        
        // Türkçe'ye çevir
        const [translation] = await translate.translate(englishCaption, 'tr');

        // Yanıt döndür
        res.json({
            success: true,
            data: {
                english: englishCaption,
                turkish: translation,
                labels: labels.map(label => ({
                    name: label.description,
                    confidence: label.score
                }))
            }
        });

    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'İşlem sırasında bir hata oluştu'
        });
    }
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 