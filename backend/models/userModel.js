const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	walletAddress: {
    type: String, // Wallet Address (Hash)
    required: true,
  },
  name: {
		type: String,
		default: '',
	},
  bio: {
    type: String,
    default: '',
  },
  email: {
		type: String,
    default: '',
	},
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePic: {
    type: String,
    default: '',
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  favorites: [
    {
      type: String,
    }
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);