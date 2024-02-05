#  MoveAI Backend

This is the backend application providing a REST API to [MoveAI react app](https://github.com/jokatty/moveAi). This application is built using Node.js, Express, and Postgres.

## Installation

To get started with the MoveAI Backend, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/jokatty/moveAi-backend.git
   ```

<hr/>

2. Install dependencies:

```
npm install
```

## DB Setup

- Update your database details in the configuration file located at `config/config.js`.
- Create the database by running: `npx sequelize db:create`.
- Apply migrations to set up tables: `npx sequelize db:migrate`.

## Google Cloud Configuration

Before using the API, you need to set up Google Cloud Bucket and Vision API. Follow these steps:

### Google Cloud Storage Bucket

Create a Google Cloud Storage Bucket to store images.

### Google Cloud Vision API

Enable the Google Cloud Vision API for your project.

## Environment Variables

Ensure that the necessary environment variables are set.

```env
GCLOUD_STORAGE_BUCKET=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/keyfile.json
```

## Start the server

```
npm start
```

## REST API: Image Upload and Google Vision API Integration

## Upload Image

### Endpoint

`POST /api/upload`

### Description

This endpoint allows users to upload images to the MoveAI Backend. Upon receiving an image, the backend makes use of Google's Vision API to analyze the content and extract various annotations.

### Request

- **Method:** `POST`
- **Route:** `/api/upload`
- **Body:** Form data with the image file

### Response

Upon successful analysis, the API responds with a JSON object containing various annotations:

```json
{
  "faceAnnotations": [],
  "landmarkAnnotations": [],
  "logoAnnotations": [],
  "labelAnnotations": [],
  "textAnnotations": [],
  "localizedObjectAnnotations": [
    /* List of objects */
    {
      "name": "exampleObject",
      "score": 0.85
    }
    // Additional objects...
  ]
}
```
