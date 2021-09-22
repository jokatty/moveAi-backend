import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

const storage = new Storage();

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export default function initUploadsContoller(db) {
  const create = async (req, res) => {
    console.log('request came in');
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', (err) => {
      console.log(err);
    });
    blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );
      // res.status(200).send(publicUrl);
      console.log(publicUrl);
    });

    blobStream.end(req.file.buffer);

    const gcsUri = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    // const gcsUri = `gs://moveai_dev/${blob.name}`;

    const [result] = await client.objectLocalization(gcsUri);
    console.log(result);
    const objects = result.localizedObjectAnnotations;
    const items = [];
    objects.forEach((object) => {
      console.log(`Name: ${object.name}`);
      items.push(object.name);
      console.log(`Confidence: ${object.score}`);
      const veritices = object.boundingPoly.normalizedVertices;
      veritices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
    });
    // res.send(items);
    res.send({ items, gcsUri });
  };

  return {
    create,
  };
}
