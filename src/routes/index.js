import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { getAccesstoken } from '../controller/auth.controller.js';
import { retrievememberProfile } from '../controller/signin.controller.js';

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

export default router;
