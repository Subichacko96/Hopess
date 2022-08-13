const NewsRouter = require('express').Router();

const auth = require('../midlewares/authMiddleware');
const news = require('../controllers/news.controllers');
const UploadImage = require('../midlewares/fileUploadMiddleware')

NewsRouter.route('/create').post(
   auth.isLogedin,
   UploadImage,
  news.createNews
);
NewsRouter.route('/list').get(
    auth.isLogedin,
    news.listPosition
  );
  NewsRouter.route('/list/all').get(
     auth.isLogedin,
    news.listAllNews
  );
  NewsRouter.route('/single/:id').get(
     auth.isLogedin,
    news.getNewsDetail
  );
  NewsRouter.route('/:id/delete').delete(
     auth.isLogedin,
    news.deleteNews
  ); 
  NewsRouter.route('/:id/update').patch(
     auth.isLogedin,
    UploadImage,
    news.updateNews
  );

  NewsRouter.route('/list/today').get(
    auth.isLogedin,
    news.listToday
  );




module.exports = NewsRouter;
