#  MoveAI Backend

This is the backend application providing a REST API to MoveAI react app. This application is built using Node.js, Express, and Postgres.

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

3. Start the server

```
npm start
```

<hr/>

## DB Setup

Step1: Update your database details in the `config file` <br/>
Step2: Create db

```
npx sequelize db:create
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
  ]
}
```
