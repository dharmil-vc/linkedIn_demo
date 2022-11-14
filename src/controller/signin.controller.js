import axios from 'axios';

import { User } from '../model/user.model.js';

export const retrievememberProfile = async (req, res) => {
  const config = { headers: { Authorization: `${req.headers.authorization}` } };
  await axios
    .all([
      axios.get(
        'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
        config
      ),
      axios.get(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        config
      ),
    ])
    .then(
      axios.spread(async (...resp) => {
        let respOne = resp[0].data;
        let respTwo = resp[1].data;
        const response = { ...respOne, ...respTwo };
        const imageUrl =
          response['profilePicture']['displayImage~']['elements'][1][
            'identifiers'
          ][0]['identifier'];

        const userObj = {
          id: response['id'],
          firstName: response['firstName']['localized']['en_US'],
          lastName: response['lastName']['localized']['en_US'],
          profilePicture: imageUrl,
          emailAddress: response['elements'][0]['handle~']['emailAddress'],
        };

        const linkedinUser = new User(userObj);
        await linkedinUser.save((err) => {
          if (err) {
            console.log('err', err);
            return;
          }
        });
        return res.status(200).send(response);
      })
    )
    .catch((err) => {
      if (err.response) {
        return res.status(err.response.status).json({ message: err });
      } else if (err.request) {
        return res.status(204).send(err.request);
        // Request was made but no response
      } else {
        console.log('error message', err.message);
      }
    });
};
