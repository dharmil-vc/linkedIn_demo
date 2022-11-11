import axios from 'axios';

export const getAccesstoken = async (req, res) => {
  const { grant_type, code, client_id, client_secret, redirect_uri } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  await axios
    .post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        grant_type,
        code,
        client_id,
        client_secret,
        redirect_uri,
      },
      config
    )
    .then((resp) => {
      res.status(resp.status).json(resp.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status).send(err.response.data);
      } else if (err.request) {
        res.status(204).send(err.request);
        // Request was made but no response
      } else {
        console.error('error message', err.message);
      }
    });
};
