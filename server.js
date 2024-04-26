import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3client.js'; // Asegúrate de que esta importación es correcta

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = 3001;

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    if (req.file) {
        const { originalname, buffer, mimetype } = req.file;
        // Extraer el nombre de la "carpeta" del nombre del archivo
        const folderName = originalname.split('_')[0]; // Asume que el nombre tiene el formato "nombreotorgado_timestamp"
        const bucketName = 'hand-recognizer';

        const uploadParams = {
            Bucket: bucketName,
            Key: `${folderName}/${originalname}`, // Estructura la clave con una "carpeta" basada en el nombre
            Body: buffer,
            ContentType: mimetype
        };

        try {
            await s3Client.send(new PutObjectCommand(uploadParams));
            console.log(`File uploaded successfully: ${originalname}`);  // Mostrar el nombre original del archivo
            res.send({ message: 'File uploaded successfully to MinIO', fileName: originalname });
        } catch (error) {
            console.error('Error uploading file to MinIO:', error);
            res.status(500).send('Error uploading file');
        }
    } else {
        console.error("No file uploaded.");
        res.status(400).send('No file uploaded');
    }
});

app.get('/', (req, res) => {
    res.send('Server is running and ready to accept requests!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
