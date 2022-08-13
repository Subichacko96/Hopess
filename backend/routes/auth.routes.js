const AuthRouter = require('express').Router();

const accounts = require('../controllers/auth.controllers');
const auth = require('../midlewares/authMiddleware');

AuthRouter.route('/signup').post(accounts.signup);
AuthRouter.route('/signin').post(accounts.signin);

AuthRouter.route('/all').get(
  auth.isLogedin,
  //auth.isAdmin,
  accounts.allUsers
);

AuthRouter.route('/singledata/:id').get(
  auth.isLogedin,
  //auth.isAdmin,
  accounts.getSingleuser
);
AuthRouter.route('/updateuser').patch(
  auth.isLogedin,
  //auth.isAdmin,
  accounts.updateuser
);

AuthRouter.route('/verify').get(
  auth.isLogedin,
  //auth.isAdmin,
  accounts.verifyToken
);

module.exports = AuthRouter;
