import axios from 'axios';

// import { User } from '../model/user.model.js';

export const retrievememberProfile = async (req, res) => {
  console.log(
    '🚀 ~ file: signin.controller.js ~ line 7 ~ retrievememberProfile ~ req.headers.authorization',
    req.headers.authorization
  );
  axios.defaults.headers.common['Authorization'];

  axios
    .all([
      axios.get(
        'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'
      ),
      axios.get(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))'
      ),
    ])
    .then((resp) => {
      console.log(
        '🚀 ~ file: signin.controller.js ~ line 24 ~ .then ~ resp',
        resp.data
      );
      res.status(resp.status).json(resp.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status).json({ message: err });
        console.log(
          '🚀 ~ file: signin.controller.js ~ line 29 ~ retrievememberProfile ~ err.response.data',
          err.response
        );
      } else if (err.request) {
        console.log(
          '🚀 ~ file: signin.controller.js ~ line 42 ~ retrievememberProfile ~ err.request',
          err.request
        );
        res.status(204).send(err.request);
        // Request was made but no response
      } else {
        console.log('error message', err.message);
      }
    });
};
