const User = require('../models/user.models');
require('dotenv').config();
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
const Users = require('../models/user.models');
const constants = require('../utils/constants');

const salt = process.env.KEY;

//Sign Up
exports.signup = async (req, res) => {
  let params = req.body;
  if (!params.name || !params.email || !params.mobile || !params.password) {
    var msg = '';
    if (!params.name) {
      msg = ' name cannot be empty';
    } else if (!params.email) {
      msg = 'email cannot be empty';
    } else if (!params.mobile) {
      msg = 'mobile cannot be empty';
    } else if (!params.password) {
      msg = 'password cannot be empty';
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    email : params.email,
    status : 1
  }
  let emailData = await Users.findOne(findCriteria)
  .catch((error) => {
    console.log(error);
    return {
    msg: 'Something went wrong while checking email already exists or not',
      statusCode: 400,
      error: true,
      data: null,
    };
  });
if (emailData && emailData.error !== undefined && emailData.error) {
  return res.send(emailData);
}
if(emailData && emailData !== null){
  return res.send({
    msg : 'Email already used',
    statusCode: 400,
    error: true,
    data: null,
  });
}
findCriteria = {
  mobile : params.mobile,
  status : 1
}
let mobileData = await Users.findOne(findCriteria)
.catch((error) => {
  console.log(error);
  return {
    msg: 'Something went wrong while checking mobile already exists or not',
    statusCode: 400,
    error: true,
    data: null,
  };
});
if (mobileData && mobileData.error !== undefined && mobileData.error) {
return res.send(mobileData);
}
if(mobileData && mobileData !== null){
return res.send({
  msg : 'Mobile already used',
  statusCode: 400,
  error: true,
  data: null,
});
}
  let plainPassword = req.body.password;

  var derivedKey = crypto.pbkdf2Sync(plainPassword, salt, 100, 32, 'sha512');

  let password = derivedKey.toString('hex');

  let userDetails = {
    name: params.name,
    email: params.email,
    password: password,
    mobile: params.mobile,
    role : constants.CO_ORDINATOR,
    status: 1,
  };

  let newUser = new User(userDetails);

  let createdUser = await newUser.save()
  .catch((error) => {
    console.log(error);
    return res.send({
      msg: 'Something went wrong while register user',
      statusCode: 400,
      error: true,
      data: null,
    });
  });

  return res.send({
    msg: 'User successfully Registerd',
    statusCode: 200,
    error: false,
    data: createdUser,
  });
};

//Signin
exports.signin = async (req, res) => {
  if (
    req.body.email == undefined ||
    req.body.password == undefined ||
    req.body.email == null ||
    req.body.password == null
  ) {
    return res.status(400).send({
      Message: 'please enter the valid username and password correctly',
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let email = req.body.email;
  let plainPassword = req.body.password;
  console.log(req.body)
  var derivedKey = crypto.pbkdf2Sync(plainPassword, salt, 100, 32, 'sha512');

  let pass = derivedKey.toString('hex');
  console.log("pass : " + pass)

  let signinUser = await User.findOne({ email: email,
     password: pass 
    }).lean();
  // console.log('--------------------');
  // console.log(signinUser);

  if (!signinUser) {
    return res.send({
      msg: 'User Not found',
      statusCode: 404,
      error: false,
      data: signinUser,
    });
  }
  signinUser.password = null;

  let token = jwt.sign(signinUser, process.env.SECRET, {
    expiresIn: 60000,
  });

  return res.status(200).send({
    msg: 'User authentication successfull ',
    statusCode: 200,
    auth: true,
    error: false,
    token: token,
    data: signinUser,
  });
};

exports.verifyToken = async (req, res) => {
  console.log(req.user.name, req.user.role, '  Verified !!');

  return res.send({
    Message: 'Token Succesfully verified',
    statusCode: 200,
    verified: true,
    role: req.user.role,
    error: false,
  });
};

exports.allUsers = (req, res) => {
  User.find({ status: 1, role: { $ne: 'super_admin' } })

    .then((users) => {
      //console.log(users);
      // let details = users;
      //details.data.password = undefined;
      return res.send({
        Message: ' Succesfully fetch user',
        statusCode: 200,
        data: users,
        error: false,
      });
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};

exports.deleteUser = async (req, res) => {
  // var userData = req.user;
  // var customerId = userData.id;
  // console.log(req);

  if (!req.params.id) {
    var msg = '';
    if (!req.params.id) {
      msg = 'id cannot be empty';
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  var userData = await User.findOneAndDelete({ _id: req.params.id }).catch(
    (error) => {
      console.log(error);
      return {
        msg: 'Something went wrong while deleting data',
        statusCode: 400,
        error: true,
        data: null,
      };
    }
  );
  if (userData && userData.error !== undefined && userData.error) {
    return res.send(userData);
  }
  if (userData) {
    return res.send({
      data: userData,
      msg: 'Data delete susccessfully',
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: 'Data not exists',
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};

exports.getSingleuser = async (req, res) => {
  // var userData = req.user;
  // var customerId = userData.id;
  //var params = req.body;
  if (!req.params.id) {
    var msg = '';
    if (!req.params.id) {
      msg = 'id cannot be empty';
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  var userData = await User.findOne(
    { _id: req.params.id },
    { password: 0 }
  ).catch((error) => {
    console.log(error);
    return {
      msg: 'Something went wrong while checking data',
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (userData && userData.error !== undefined && userData.error) {
    return res.send(userData);
  }
  if (userData) {
    return res.send({
      data: userData,
      msg: 'Data fetch susccessfully',
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: 'Data not exists',
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};

exports.updateuser = async (req, res) => {
  // var userData = req.user;
  // var customerId = userData.id;
  var params = req.body;
  let formId = params.id;

  if (!params.id) {
    var msg = '';
    if (!params.id) {
      msg = 'id cannot be empty';
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let newData = {};
  let plainPassword;
  if (params.name) {
    newData.name = params.name;
  }

  if (params.email) {
    newData.email = params.email;
  }

  if (params.password) {
    plainPassword = params.password;
    let derivedKey = crypto.pbkdf2Sync(plainPassword, salt, 100, 32, 'sha512');
    newData.password = derivedKey.toString('hex');
  }

  var updateData = await User.findOneAndUpdate({ _id: formId }, newData).catch(
    (error) => {
      console.log(error);
      return {
        msg: 'Something went wrong while checking data',
        statusCode: 400,
        error: true,
        data: null,
      };
    }
  );
  if (updateData && updateData.error !== undefined && updateData.error) {
    return res.send(updateData);
  }
  console.log(updateData);

  if (updateData) {
    return res.send({
      data: updateData,
      msg: 'Data edit susccessfully',
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: 'Data not exists',
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};
