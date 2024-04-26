# Backend para Reconocimiento de Gestos de Mano

Este servidor backend está diseñado para manejar la carga de imágenes capturadas desde una interfaz frontal que utiliza la webcam para detectar gestos de la mano. Las imágenes son procesadas y subidas directamente a MinIO, un almacenamiento de objetos compatible con S3, sin almacenarlas en el disco local.

## Características

- **Recepción de imágenes en tiempo real**: Acepta imágenes enviadas desde una interfaz de usuario y las procesa inmediatamente.
- **Subida directa a MinIO**: Las imágenes son subidas directamente al almacenamiento en la nube de MinIO sin almacenamiento intermedio en el servidor.
- **Estructuración dinámica**: Organiza las imágenes en MinIO según el nombre del gesto, facilitando su gestión y acceso.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express.js**: Framework de Node.js para construir aplicaciones web y APIs de forma rápida y sencilla.
- **Multer**: Middleware para manejo de `multipart/form-data`, usado principalmente para la carga de archivos.
- **AWS SDK for JavaScript**: Utilizado para interactuar con MinIO a través de la API de S3.
- **MinIO**: Almacenamiento de objetos de alto rendimiento que es compatible con las API de Amazon S3.

## Requisitos Previos

Necesitarás tener instalado Node.js y npm. También necesitas acceso a un servidor MinIO, ya sea localmente o en la nube.

## Instalación

Clona el repositorio y instala las dependencias:

```bash
git clone https://github.com/Franperiyeah/hand-recognizer-back.git
cd hand-recognizer-back
npm install
