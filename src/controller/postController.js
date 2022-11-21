import axios from 'axios';
import fs from 'fs';

import { payload } from '../utils/payloadObj';

export const postController = async (req, res) => {
    try {
        const config = {
            headers: { Authorization: `${req.headers.authorization}` },
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
                    payload(req.body)[1],
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${req.headers.authorization}`,
                        },
                    }
                );

                console.log('Post created successfully');
                res.status(imagePostResp.status).send(imagePostResp.data);
                break;
        }
    } catch (err) {
        console.log(
            '🚀 ~ file: postController.js ~ line 114 ~ postController ~ err',
            err
        );
    }
};
