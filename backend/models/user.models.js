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
const userSchema = new Schema(
  {
    name:String,

    email: String,
    password:String,
    role: {
      type: String,
      enum: [
        constants.SUPER_ADMIN,
        constants.CO_ORDINATOR
      ],
    },
    mobile: String,
    status:Number,
  },
  {
    timestamps: true,
  },
  options
);

const users = mongoose.model('User', userSchema,'Users');

module.exports = users;
