const WebRouter = require('express').Router();

const auth = require('../midlewares/authMiddleware');
const web = require('../controllers/web.controllers');
const UploadImage = require('../midlewares/fileUploadMiddleware')


WebRouter.route('/list').get(
    //  auth.isLogedin,
    web.DashboardNews
  );
  WebRouter.route('/list/all').get(
    //  auth.isLogedin,
    web.listAllNews
  );
  // list  category name  in home page
  WebRouter.route('/list/allcategory').get(
    //  auth.isLogedin,
    web.listCategory
  );
  //list  news with category
  WebRouter.route('/list/newscategory/').get(
    //  auth.isLogedin,
    web.listNewsCategory
  );

  WebRouter.route('/:id/singlenews').get(
    // auth.isLogedin,
    web.getSingleNewsDetail
 );
 WebRouter.route('/adsall').get(
  // auth.isLogedin,
  web.allAds
);




module.exports = WebRouter;
