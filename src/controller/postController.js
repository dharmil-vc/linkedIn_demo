import axios from 'axios';
import { payload } from '../utils/payloadObj';

export const postController = async (req, res) => {
    const config = {
        headers: { Authorization: `${req.headers.authorization}` },
    };
    const {
        authorId,
        shareMediaCategory,
        text,
        mediaTitle,
        mediaDescription,
        mediaUrl,
        mediaAsset,
    } = req.body;

    console.log(
        '🚀 ~ file: postController.js ~ line 24 ~ postController ~ payload(authorId, text, shareMediaCategory)',
        payload(authorId, shareMediaCategory)
    );
    switch (shareMediaCategory) {
        case 'NONE':
            axios
                .post(
                    'https://api.linkedin.com/v2/ugcPosts',
                    payload(authorId, text, shareMediaCategory),
                    config
                )
                .then((resp) => {
                    console.log(
                        '🚀 ~ file: postController.js ~ line 35 ~ .then ~ resp',
                        resp.data
                    );
                    return res.status(200).send(resp.data);
                })
                .catch((err) => {
                    if (err.response) {
                        return res
                            .status(err.response.status)
                            .json({ message: err });
                    } else if (err.request) {
                        return res.status(204).send(err.request);
                        // Request was made but no response
                    } else {
                        console.log('error message', err.message);
                    }
                });
            break;
        case 'ARTICLE':
            axios
                .post(
                    'https://api.linkedin.com/v2/ugcPosts',
                    payload(
                        authorId,
                        text,
                        shareMediaCategory,
                        mediaTitle,
                        mediaDescription,
                        mediaUrl
                    ),
                    config
                )
                .then((resp) => {
                    console.log(
                        '🚀 ~ file: postController.js ~ line 35 ~ .then ~ resp',
                        resp.data
                    );
                    return res.status(200).send(resp.data);
                })
                .catch((err) => {
                    if (err.response) {
                        return res
                            .status(err.response.status)
                            .json({ message: err });
                    } else if (err.request) {
                        return res.status(204).send(err.request);
                        // Request was made but no response
                    } else {
                        console.log('error message', err.message);
                    }
                });
            break;
        case 'IMAGE':
            axios
                .post(
                    'https://api.linkedin.com/v2/assets?action=registerUpload',
                    payload(authorId, shareMediaCategory)[0],
                    config
                )
                .then((resp) => {
                    console.log('response data', resp.data);
                    const uploadUrl =
                        resp.data['value']['uploadMechanism'][
                            'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'
                        ]['uploadUrl'];
                    const asset = resp.data['value']['asset'];

                    axios.post(`${uploadUrl}`, config);
                    res.status(200).send(resp.data);
                })
                .catch((err) => console.log(err));
            break;
    }
};
