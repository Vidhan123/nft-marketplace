const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	itemId: {
    type: String,
    required: true,
  },
  plays: {
    type: Number,
    default: 0,
  },
  uniqueListeners: [
    {
      type: String,
    },
  ],
  listeningTimes: [ // Listening time = Pause time - Play Time
    {
      type: Number,
    },
  ],
  avgListeningTime: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Item', ItemSchema);