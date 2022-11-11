import express from 'express';
import { getAccesstoken } from '../controller/auth.controller.js';

const router = express.Router();

// Exchange Authorization Code for an Access Token Route
router.post('/authToken', getAccesstoken);

// Retrieving Member Profiles Route
// router.get('/userProfile', retrievememberProfile);

export default router;
