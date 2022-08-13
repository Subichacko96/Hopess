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
const adSchema = new Schema(
  {
    coOrdinatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    adsname:String,
    //date:Number,
    image:String,
    link:String,
    position:{
      type: String,
    enum: [
      constants.TOPMOST,
      constants.TOP,
      constants.RIGHT,
      constants.LEFT,
      constants.CENTER,
      constants.BOTTOM,
    ],
  },
 
    status:Number,
  },
  {
    timestamps: true,
  },

);

const ads = mongoose.model('Ads', adSchema,'Adses');

module.exports = ads;
