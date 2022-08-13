const News = require("../models/news.models");
const Ads = require("../models/ads.models");
const User = require("../models/user.models");
const constants = require("../utils/constants");
const commonHelper = require("../helpers/common.helper");
var ObjectId = require("mongoose").Types.ObjectId;

exports.createAds = async (req, res) => {
  let params = req.body;
  // let coOrdinatorId = req.params.id;
  console.log(params,"🎉")
  let adImage = req.files[0];
  console.log(req.files[0],"ad details")
  if (
    !params.adsname ||
    // !params.date ||
    !adImage.filename ||
    !params.link ||
    !params.position
  ) {
    var msg = "";
    if (!params.adsname) {
      msg = " name cannot be empty";
    // } else if (!params.date) {
    //   msg = "date cannot be empty";
     } 
    else if (!adImage.filename) {
      msg = "Image cannot be empty";
    } else if (!params.link) {
      msg = "link cannot be empty";
    } else if (!params.position) {
      msg = "position cannot be empty";
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  if (
    params.position !== constants.TOPMOST &&
    params.position !== constants.TOP &&
    params.position !== constants.RIGHT &&
    params.position !== constants.LEFT &&
    params.position !== constants.CENTER &&
    params.position !== constants.BOTTOM
  ) {
    return res.send({
      msg: "invalid Position",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    // coOrdinatorId,
    adsname: params.adsname,
    status: 1,
  };
  let checkAdsName = await Ads.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting Ads",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (checkAdsName && checkAdsName.error !== undefined && checkAdsName.error) {
    return res.send(checkAdsName);
  }
  // if (checkAdsName && checkAdsName !== null) {
  //   return res.send({
  //     msg: "Ads name already exists",
  //     statusCode: 400,
  //     error: true,
  //     data: null,
  //   });
  // }

  let adPositionCheckResult= await commonHelper.adCheckPosition(params)
  if(adPositionCheckResult && adPositionCheckResult.error!==undefined && adPositionCheckResult.error){
      return res.send(adPositionCheckResult)
  }

  let adsObj = {
    //coOrdinatorId,
    adsname: params.adsname,
    //date: params.date,
    image: req.files[0].filename,
    link: params.link,
    position: params.position,
    status: 1,
  };
  console.log(adsObj, "ads data");
  let newAdsObj = new Ads(adsObj);
  let newadsData = await newAdsObj.save().catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while adding ads",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (newadsData && newadsData.error !== undefined && newadsData.error) {
    return res.send(newadsData);
  }
  return res.send({
    msg: "Ads created successfully ",
    statusCode: 200,
    auth: true,
    error: false,
    data: null,
  });
};

exports.listAdPosition = async (req, res) => {
  let findCriteria = {
    // coOrdinatorId,
    status: 1,
  };
  let projection = {
    position: 1,
    _id: 1,
  };
  let positionAdNames = await Ads.find(findCriteria, projection)
    .sort({
      position: 1,
    })
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while listing position names",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
  if (
    positionAdNames &&
    positionAdNames.error !== undefined &&
    positionAdNames.error
  ) {
    return res.send(positionAdNames);
  }
  let adArrayOne = constants.adsPosition;
  let adArrayTwo = positionAdNames;
  const adResults = adArrayOne.filter(
    ({ position: id1 }) => !adArrayTwo.some(({ position: id2 }) => id2 === id1)
  );
  if (adResults) {
    return res.send({
      data: adResults,
      // data: positionNames,
      msg: "Position name list",
      statusCode: 200,
      error: false,
    });
  }
};

exports.listAllAds = async (req, res) => {
  // let coOrdinatorId = req.user.id;

  let params = req.query;
  let page = params.page || 1;
  page = page > 0 ? page : 1;
  let perPage = Number(params.limit) || constants.PER_PAGE;
  perPage = perPage > 0 ? perPage : constants.PER_PAGE;
  let offset = (page - 1) * perPage;
  let findCriteria = {
    // coOrdinatorId,
    status: 1,
  };

  let adsList = await Ads.find(findCriteria)
    .limit(perPage)
    .skip(offset)
    .sort({
      createdAt: -1,
    })
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while listing Ads",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
  if (adsList && adsList.error !== undefined && adsList.error) {
    return res.send(adsList);
  }

  let adsCount = await Ads.countDocuments(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting Ads count",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (adsCount && adsCount.error !== undefined && adsCount.error) {
    return res.send(adsCount);
  }

  let totalPages = adsCount / perPage;
  totalPages = Math.ceil(totalPages);
  var hasNextPage = page < totalPages;
  let data = {
    totalPages,
    hasNextPage,
    perPage,
    items: adsList,
  };
  return res.send({
    data,
    msg: "Ads list",
    statusCode: 200,
    error: false,
  });
};

exports.getAdsDetail = async (req, res) => {
  // let coOrdinatorId = req.user.id;
  let adsId = req.params.id;

  let isValidId = ObjectId.isValid(adsId);
  if (!isValidId) {
    return res.send({
      msg: "adsId is invalid",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    _id: adsId,
    // coOrdinatorId,
    status: 1,
  };
  var AdsData = await Ads.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while checking Ads data",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (AdsData && AdsData.error !== undefined && AdsData.error) {
    return res.send(AdsData);
  }
  if (AdsData) {
    return res.send({
      msg: "Ads fetch susccessfully",
      data: AdsData,
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "No Ads Detail",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};

exports.deleteAds = async (req, res) => {
  // let coOrdinatorId = req.user.id;
  let adsId = req.params.id;

  let isValidId = ObjectId.isValid(adsId);
  if (!isValidId) {
    return res.send({
      msg: "adsId is invalid",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    _id: adsId,
    // coOrdinatorId,
    status: 1,
  };

  let adsData = await Ads.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting ads detail",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (adsData && adsData.error !== undefined && adsData.error) {
    return res.send(adsData);
  }
  if (adsData && adsData !== null) {
    let update = {
      status: 0,
    };
    let updateData = await Ads.updateOne(findCriteria, update).catch(
      (error) => {
        console.log(error);
        return {
          msg: "Something went wrong while deleting Ads",
          statusCode: 400,
          error: true,
          data: null,
        };
      }
    );
    if (updateData && updateData.error !== undefined && updateData.error) {
      return res.send(updateData);
    }
    return res.send({
      data: null,
      msg: "Ads deleted successfully",
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "Ads Not Exist",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};

exports.updateAds = async (req, res) => {

  var adsId = req.params.id;
  var userData = req.user;
  var imgFile = req.files[0];
 // var coOrdinatorId = userData.id;
 
  var params = req.body;
  console.log(params,"form data")
  // console.log(imgFile,"🤲")
  // console.log( req.params.id)

  var findCriteria = {
    _id: adsId,
    //coOrdinatorId,
    status: 1,
  };

  var checkAds = await Ads.findOne(findCriteria).catch((err) => {
    return {
      success: 0,
      msg: "Something went wrong while check Ads",
      statusCode: 400,
      error: true,
      data: err,
    };
  });
  if (checkAds && checkAds.success !== undefined && checkAds.success === 0) {
    delete checkAds.success;
    return res.send(checkAds);
  }
  if (checkAds) {
    if (
     // !params.coOrdinatorId &&
      !params.adsname &&
      (imgFile != null && !imgFile.filename) &&
      !params.position &&
      !params.link 
    ) {
      return res.send({
        success: 0,
        msg: "Nothing to update",
        statusCode: 400,
        error: true,
        data: null,
      });
    }
    let PositionCheckResult = await commonHelper.adCheckPosition(params);
    if (
      PositionCheckResult &&
      PositionCheckResult.error !== undefined &&
      PositionCheckResult.error
    ) {
      return res.send(PositionCheckResult);
    }
 
    if (params.adsname) {
      checkAds.adsname = params.adsname;
    }
    
    if (imgFile && imgFile.filename) {
      checkAds.image = imgFile.filename;
    }
    if (params.position) {
      checkAds.position = params.position;
    }
    if (params.link) {
      checkAds.link = params.link;
    }

    var updateAds = await checkAds.save().catch((err) => {
      return {
        success: 0,
        msg: "Something went wrong while updating Ads",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
    if (
      updateAds &&
      updateAds.success !== undefined &&
      updateAds.success === 0
    ) {
      delete updateAds.success;
      return res.send(updateAds);
    }
    return res.send({
      data: updateAds,
      msg: "Ads updated successfully..",
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "Invalid Ads",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};
