#  MoveAI Backend

This the backend application providing a REST API to MoveAI react app.

## Install

<hr/>

```javascript
npm install
```

## DB Setup

<hr/>
Step1: Update your details in the config file <br/>
Step2: Run<br/>

```
npx sequelize db:create
```

## Run the app

<hr/>

```
node index.mjs
```

## REST API

<hr />
Upload image

```
/api/upload
```

## Response

<hr/>

```
{
  faceAnnotations: [],
  landmarkAnnotations: [],
  logoAnnotations: [],
  labelAnnotations: [],
  textAnnotations: [],
  localizedObjectAnnotations: [objects]
}
```

<hr/>
