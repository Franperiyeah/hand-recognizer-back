import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { s3Client } from './s3client.js';
import { PutObjectCommand } from "@aws-sdk/client-s3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');  // Define uploadsDir aquí

const uploadDirToS3 = async (dirPath, bucketName) => {
    const items = fs.readdirSync(dirPath);

    for (let item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isFile()) {
            const fileContent = fs.readFileSync(fullPath);
            const key = fullPath.substring(uploadsDir.length + 1).replace(/\\/g, '/');

            const uploadParams = {
                Bucket: "hand-recognizer",
                Key: key,
                Body: fileContent
            };

            try {
                await s3Client.send(new PutObjectCommand(uploadParams));
                console.log(`File uploaded successfully: ${key}`);
            } catch (error) {
                console.error(`Error uploading file: ${key}:`, error);
            }
        } else if (stats.isDirectory()) {
            await uploadDirToS3(fullPath, bucketName);
        }
    }
};

uploadDirToS3(uploadsDir, 'hand-recognizer').then(() => {
    console.log('Upload complete.');
}).catch(error => {
    console.error('Error uploading directory:', error);
});
