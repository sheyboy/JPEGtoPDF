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
2. Run the development server:
   `npm run dev`

## API Server

This repository also includes an Express server that hosts both the conversion API and the built web UI.

1. Build the frontend:
   `npm run build`
2. Start the server:
   `npm start`
   The web UI will be available at `http://localhost:3000`.
3. Send a POST request to `http://localhost:3000/api/convert` with a JSON body containing an array of base64-encoded JPEG data
   URLs:

```json
{
  "images": ["data:image/jpeg;base64,..."]
}
```

The server responds with the generated PDF file (`Content-Type: application/pdf`).
