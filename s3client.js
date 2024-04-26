// s3client.js
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1",  // La región puede ser ficticia si estás utilizando MinIO localmente
    credentials: {
        accessKeyId: "minioadmin",  // Asegúrate de que estas son tus credenciales de MinIO
        secretAccessKey: "minioadmin"
    },
    endpoint: "http://localhost:9000",  // Esto debe ser solo la URL base de tu MinIO
    forcePathStyle: true,  // Esto es necesario para que MinIO funcione correctamente con AWS SDK
    signatureVersion: 'v4'
});

export { s3Client };
