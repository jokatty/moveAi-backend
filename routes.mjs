import Multer from 'multer';
import db from './models/index.mjs';
import initUploadsContoller from './controllers/uploads.mjs';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
export default function routes(app) {
  const uploads = initUploadsContoller(db);
  app.post('/upload', multer.single('image'), uploads.create);
}
