import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { getAccesstoken } from '../controller/auth.controller';
import { retrievememberProfile } from '../controller/signin.controller';
import { postController } from '../controller/postController';
import { upload } from '../middleware/uploadImg';
// import { uploadText } from '../middleware/uploadImg';

const router = express.Router();
const options = {
    customCss: '.swagger-ui .topbar { display: none }',
};
const swaggerDocument = YAML.load(
    path.join(path.resolve(), './src/docs/swagger.yml')
);

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
);

// Exchange Authorization Code for an Access Token Route
router.post('/authToken', getAccesstoken);

// Retrieving Member Profiles Route
router.get('/userProfile', retrievememberProfile);

// Creating post route
router.post('/createPost', upload, postController);

export default router;
