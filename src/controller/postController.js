import axios from 'axios';
import fs from 'fs';

import {
  payload
} from '../utils/payloadObj';

export const postController = async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`
      },
    };

    const postUrl = 'https://api.linkedin.com/v2/ugcPosts';

    switch (req.body.shareMediaCategory) {
      case 'NONE':
        console.log(
          '🚀 in none ============',
          JSON.stringify(payload(req.body))
        );
        const textResp = await axios.post(
          `${postUrl}`,
          payload(req.body),
          config
        );

        res.status(textResp.status).send(textResp.data);

        break;
      case 'ARTICLE':
        let articleResp = await axios.post(
          `${postUrl}`,
          payload(req.body),
          config
        );
        res.status(200).send(articleResp.data);
        break;
      case 'IMAGE':
        if (Boolean(imageTypeChecker())) {
          // register Image axios call
          const registerImgResp = await axios.post(
            'https://api.linkedin.com/v2/assets?action=registerUpload',
            payload(req.body)[0],
            config
          );

          console.log('Image registerd successfully');
          if (!registerImgResp.data)
            return res.status(400).send('Image not registered');

          // Image upload axios call
          const uploadUrl =
            registerImgResp.data['value']['uploadMechanism'][
              'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'
            ]['uploadUrl'];

          req.body.asset = registerImgResp.data['value']['asset'];
          const file = fs.readFileSync(req.file.path);

          await axios.post(`${uploadUrl}`, file, {
            headers: {
              'Content-Type': 'image/jpeg',
              Authorization: `${req.headers.authorization}`,
            },
          });

          console.log('Image uploaded successfully');

          // create image post
          const imagePostResp = await axios.post(
            `${postUrl}`,
            payload(req.body)[1], {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${req.headers.authorization}`,
              },
            }
          );
          console.log("🚀 ~line number file: postController.js ~line number line 82 ~line number postController ~line number imagePostResp", imagePostResp);

          console.log('Post created successfully');
          res.status(imagePostResp.status).send(imagePostResp.data);
          break;
        } else {
          res.status(415).send({
            message: "Unsupported file found. Please upload JPEG, PNG, GIF"
          })
        }
        default:
          res.status(422).send({
            message: "Please enter shareMediaCategory"
          });
    }
    const imageTypeChecker = () => {
      const image = req.file;
      const readFile = fs.readFileSync(image.path);
      const unit = new Uint8Array(readFile);
      let bytes = [];
      unit.forEach((byte) => {
        bytes.push(byte.toString(16));
      })
      let hex = bytes.join('').toUpperCase().substring(0, 8);
      // const readFileData = JSON.parse(readFile).data;
      console.log("🚀 ~line number file: imageTypeChecker.js ~line number line 7 ~line number imageTypeChecker ~line number readFileData", hex);
      switch (hex) {
        case 'FFD8FFE0':
        case 'FFD8FFEE':
        case 'FFD8FFE1':
          console.log("It's an jpeg image");
          return true
        case '89504E47':
          console.log("It's an png image");
          return true
        case '47494638':
          console.log("It's an gif image");
          return true
        default:
          console.error("Unsupported file found. Please upload JPEG, PNG, GIF");
          return false;
      }
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: postController.js ~ line 114 ~ postController ~ err',
      error
    );
    res.status(error.response.status).send(error.response.data)
  }
};