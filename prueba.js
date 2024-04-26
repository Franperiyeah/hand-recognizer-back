import express from 'express';
import multer from 'multer';
import { s3Client } from './s3client.js';
import { PutObjectCommand } from "@aws-sdk/client-s3";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { originalname, buffer, mimetype } = req.file;
    const bucketName = 'hand-recognizer';

    const uploadParams = {
        Bucket: bucketName,
        Key: originalname,
        Body: buffer,
        ContentType: mimetype  // Asegúrate de enviar el tipo de contenido correcto
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        res.send({ message: 'File uploaded successfully', location: data.Location });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
