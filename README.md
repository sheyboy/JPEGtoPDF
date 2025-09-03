<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# JPEG to PDF Converter

A simple web application and REST API for turning JPEG images into a single PDF document.
Use the browser-based interface to upload or paste images, preview them, and download
the generated PDF. An Express server is included for server-side conversion.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Start the API server in one terminal:
   `npm start`
3. In a separate terminal start the development server:
   `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser to use the app.

## API Server

The Express server exposes JPEG-to-PDF conversion as a REST API.

1. Start the server:
   `npm start`
2. Send a POST request to `http://localhost:3000/api/convert` with a JSON body containing an array of base64-encoded JPEG data URLs:

```json
{
  "images": ["data:image/jpeg;base64,..."]
}
```

The server responds with the generated PDF file (`Content-Type: application/pdf`).
