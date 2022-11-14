import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model('user', userSchema);
