var jwt = require('jsonwebtoken');
const CONSTANTS = require('../utils/constants');
const Users = require('../models/user.models');
//Custom middleware
exports.isLogedin = async(req, res, next) => {
  try {
    //console.log('haai');
    // const token = req.header('Authorization').trim();
    // const token = req.headers.authorization.split(" ")[1];
    //console.log(req.header('Authorization').replace('Bearer ', ''));

    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('token');
    console.log(token);
    console.log('token');

    const userDetails = jwt.verify(token, process.env.SECRET);
    console.log(userDetails)

    const userId = userDetails._id;
    // console.log('userId');
    // console.log(userId);
    // console.log('userId');
    const user = await Users.findOne({
      _id: userId,
      status: 1,
    });
    //console.log(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log('error');
    console.log(error);
    console.log('error');
    res
      .status(401)
      .send({ error: 401, msg: 'Not authorized to access this resource' });
  }
};
