import Multer from 'multer';
import db from './models/index.mjs';
import initUploadsContoller from './controllers/uploads.mjs';
import initAuthController from './controllers/auths.mjs';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
export default function routes(app) {
  const uploads = initUploadsContoller(db);
  const userAuth = initAuthController(db);
  app.get('/', (req, res) => {
    res.send('Welcome to moveAI backend');
  });
  app.post('/upload', multer.single('image'), uploads.create);
  app.post('/signup', userAuth.createUser);
  app.post('/login', userAuth.loginUser);
}
