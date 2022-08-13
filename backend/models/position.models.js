// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const constants = require('../utils/constants');

// function transform(ret) {
//   ret.id = ret._id;
//   delete ret._id;
//   delete ret.status;
// }
// var options = {
//   toObject: {
//     virtuals: true,
//     transform: function (doc, ret) {
//       transform(ret);
//     },
//   },
//   toJSON: {
//     virtuals: true,
//     transform: function (doc, ret) {
//       transform(ret);
//     },
//   },
// };
// const positionSchema = new Schema(
//   {

//     position:{
//         type: String,
//       enum: [
//         constants.ONE,
//         constants.TWO,
//         constants.THREE,
//         constants.FOUR,
//         constants.FIVE,
//         constants.NOPREFERENCE,
//       ],
//     },
//     newsIds: 
//     [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'News',
//     }],
//   },
//   {
//     timestamps: true,
//   },

// );

// const Positions = mongoose.model('Position', positionSchema,'Positions');

// module.exports = positions;
