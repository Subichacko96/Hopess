const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const constants = require('../utils/constants');

function transform(ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.status;
}
var options = {
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      transform(ret);
    },
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      transform(ret);
    },
  },
};
const newsSchema = new Schema(
  {
    coOrdinatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name:String,
    date:Number,
    content:String,
    image: [{
      type: String,
     }],
    position:{
      type: String,
    enum: [
      constants.ONE,
      constants.TWO,
      constants.THREE,
      constants.FOUR,
      constants.FIVE,
      constants.NOPREFERENCE,
    ],
  },
    category: {
      type: String,
      enum: [
        constants.BUSINESS,
        constants.FILM,
        constants.TRAVEL,
        constants.FOOD,
        constants.SOCIALMEDIA_STARS,
        constants.SPORTS,
      ],
    },
    location:{
        type: String,
      enum: [
        constants.UK,
        constants.INDIA,
        constants.UAE,
      ],
    },
    status:Number,
  },
  {
    timestamps: true,
  },

);

const news = mongoose.model('News', newsSchema,'Newses');

module.exports = news;
