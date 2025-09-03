<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1YcmTR1d9Gc2pSGGNdVgpZu1lqxJkEb4I

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
3. Start the API server in one terminal:
   `npm start`
4. In a separate terminal start the development server:
   `npm run dev`
5. Open [http://localhost:5173](http://localhost:5173) in your browser to use the app.

## API Server

This repository also includes a small Express server that exposes the JPEG-to-PDF conversion as a REST API.

1. Start the server:
   `npm start`
2. Send a POST request to `http://localhost:3000/api/convert` with a JSON body containing an array of base64-encoded JPEG data
   URLs:

```json
{
  "images": ["data:image/jpeg;base64,..."]
}
```

The server responds with the generated PDF file (`Content-Type: application/pdf`).
