const AdsRouter = require('express').Router();

const auth = require('../midlewares/authMiddleware');
const ads = require('../controllers/ads.controllers');
const UploadImage = require('../midlewares/fileUploadMiddleware')

AdsRouter.route('/create').post(
   auth.isLogedin,
   UploadImage,
  ads.createAds
);
AdsRouter.route('/list/position').get(
    auth.isLogedin,
    ads.listAdPosition
  );
  AdsRouter.route('/list/all').get(
     auth.isLogedin,
    ads.listAllAds
  );
  AdsRouter.route('/:id/single').get(
    auth.isLogedin,
    ads.getAdsDetail
  );
  AdsRouter.route('/:id/delete').delete(
     auth.isLogedin,
    ads.deleteAds
  );
  AdsRouter.route('/:id/update').patch(
    auth.isLogedin,
    UploadImage,
    ads.updateAds
  );





module.exports = AdsRouter;
