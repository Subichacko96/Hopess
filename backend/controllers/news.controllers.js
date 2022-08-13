const News = require("../models/news.models");
const User = require("../models/user.models");
const constants = require("../utils/constants");
const commonHelper = require("../helpers/common.helper");
var ObjectId = require("mongoose").Types.ObjectId;

exports.createNews = async (req, res) => {
  let coOrdinatorId = req.user.id;
  let params = req.body;
 
   let imgFiles = req.files;
  //console.log(params, "👲");

  if (
    !params.name ||
    !params.date ||
    !imgFiles || imgFiles.length===0||
    !params.content ||
    !params.position ||
    !params.category ||
    !params.location
  ) {
    var msg = "";
    if (!params.name) {
      msg = " name cannot be empty";
    } else if (!params.content) {
      msg = "description cannot be empty";
    } 
    else if (!imgFiles || imgFiles.length===0) {
      msg = "image cannot be empty";
    } 
    else if (!params.position) {
      msg = "position cannot be empty";
    } else if (!params.category) {
      msg = "category cannot be empty";
    } else if (!params.location) {
      msg = "location cannot be empty";
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  if (
    params.position !== constants.NOPREFERENCE &&
    params.position !== constants.ONE &&
    params.position !== constants.TWO &&
    params.position !== constants.THREE &&
    params.position !== constants.FOUR &&
    params.position !== constants.FIVE
  ) {
    return res.send({
      msg: "invalid Position",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  if (
    params.category !== constants.BUSSINESS &&
    params.category !== constants.FILM &&
    params.category !== constants.FOOD &&
    params.category !== constants.TRAVEL&&
    params.category !== constants.SOCIALMEDIA_STARS&&
    params.category !== constants.SPORTS
  ) {
    return res.send({
      msg: "invalid Category",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  if (
    params.location !== constants.UK &&
    params.location !== constants.INDIA &&
    params.location !== constants.UAE
  ) {
    return res.send({
      msg: "invalid Location",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    coOrdinatorId,
    name: params.name,
    status: 1,
  };
  let checkNewsName = await News.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting service count",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (
    checkNewsName &&
    checkNewsName.error !== undefined &&
    checkNewsName.error
  ) {
    return res.send(checkNewsName);
  }
  if (checkNewsName && checkNewsName !== null) {
    return res.send({
      msg: "News name already exists",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let NameCheckResult = await commonHelper.checkName(params);
  if (
    NameCheckResult &&
    NameCheckResult.error !== undefined &&
    NameCheckResult.error
  ) {
    return res.send(NameCheckResult);
  }

  let newsObj = {
    coOrdinatorId,
    name: params.name,
    content: params.content,
    date: params.date,
    image: imgFiles.map(file=>{
      return file.filename
    }
      ),
    position: params.position,
    category: params.category,
    location: params.location,
    status: 1,
  };
  console.log(newsObj, "🤶");
  let newNewsObj = new News(newsObj);
  let newNewsData = await newNewsObj.save().catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting service count",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (newNewsData && newNewsData.error !== undefined && newNewsData.error) {
    return res.send(newNewsData);
  }
  return res.send({
    msg: "News created successfully ",
    statusCode: 200,
    auth: true,
    error: false,
    data: null,
  });
};

exports.listPosition = async (req, res) => {
  let findCriteria = {
    // coOrdinatorId,
    position: { $ne: constants.NOPREFERENCE },
    status: 1,
  };
  let projection = {
    position: 1,
    _id: 1,
  };
  let positionNames = await News.find(findCriteria, projection)
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
    positionNames &&
    positionNames.error !== undefined &&
    positionNames.error
  ) {
    return res.send(positionNames);
  }
  let arrayOne = constants.arrayPosition;
  let arrayTwo = positionNames;
  const results = arrayOne.filter(
    ({ position: id1 }) => !arrayTwo.some(({ position: id2 }) => id2 === id1)
  );
  if (results) {
    return res.send({
      data: results,
      // data: positionNames,
      msg: "Position name list",
      statusCode: 200,
      error: false,
    });
  }
};

exports.listAllNews = async (req, res) => {
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

  let newsList = await News.find(findCriteria)
    .limit(perPage)
    .skip(offset)
    .sort({
      createdAt: -1,
    })
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while listing News",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
  if (newsList && newsList.error !== undefined && newsList.error) {
    return res.send(newsList);
  }

  let newsCount = await News.countDocuments(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting News count",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (newsCount && newsCount.error !== undefined && newsCount.error) {
    return res.send(newsCount);
  }

  let totalPages = newsCount / perPage;
  totalPages = Math.ceil(totalPages);
  var hasNextPage = page < totalPages;
  let data = {
    totalPages,
    hasNextPage,
    perPage,
    items: newsList,
  };
  return res.send({
    data,
    msg: "News list",
    statusCode: 200,
    error: false,
  });
};

exports.getNewsDetail = async (req, res) => {
  // let coOrdinatorId = req.user.id;
  let newsId = req.params.id;

  let isValidId = ObjectId.isValid(newsId);
  if (!isValidId) {
    return res.send({
      msg: "newsId is invalid",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    _id: newsId,
    // coOrdinatorId,
    status: 1,
  };
  var NewsData = await News.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while checking News data",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (NewsData && NewsData.error !== undefined && NewsData.error) {
    return res.send(NewsData);
  }
  if (NewsData) {
    return res.send({
      msg: "News fetch susccessfully",
      data: NewsData,
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "No News Detail",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};

exports.deleteNews = async (req, res) => {
  // let coOrdinatorId = req.user.id;
  let newsId = req.params.id;

  let isValidId = ObjectId.isValid(newsId);
  if (!isValidId) {
    return res.send({
      msg: "newsId is invalid",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    _id: newsId,
    // coOrdinatorId,
    status: 1,
  };

  let newsData = await News.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting news detail",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (newsData && newsData.error !== undefined && newsData.error) {
    return res.send(newsData);
  }
  if (newsData && newsData !== null) {
    let update = {
      status: 0,
    };
    let updateData = await News.updateOne(findCriteria, update).catch(
      (error) => {
        console.log(error);
        return {
          msg: "Something went wrong while deleting News",
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
      msg: "News deleted successfully",
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "News Not Exist",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};
exports.updateNews = async (req, res) => {

  var newsId = req.params.id;
  var userData = req.user;
  let imgFiles = req.files;
  //var coOrdinatorId = userData.id;
 
  var params = req.body;
  console.log(params,"form data")
  // console.log(imgFile,"🤲")
  // console.log( req.params.id)

  var findCriteria = {
    _id: newsId,
    //coOrdinatorId,
    status: 1,
  };

  var checkNews = await News.findOne(findCriteria).catch((err) => {
    return {
      success: 0,
      msg: "Something went wrong while check News",
      statusCode: 400,
      error: true,
      data: err,
    };
  });
  if (checkNews && checkNews.success !== undefined && checkNews.success === 0) {
    delete checkNews.success;
    return res.send(checkNews);
  }
  if (checkNews) {
    if (
     // !params.coOrdinatorId &&
      !params.name &&
      !params.date &&
      !params.content &&
      (!imgFiles || imgFiles.length===0) &&
      !params.position &&
      !params.category &&
      !params.location
    ) {
      return res.send({
        success: 0,
        msg: "Nothing to update",
        statusCode: 400,
        error: true,
        data: null,
      });
    }

    let NameCheckResult = await commonHelper.checkName(params);
    if (
      NameCheckResult &&
      NameCheckResult.error !== undefined &&
      NameCheckResult.error
    ) {
      return res.send(NameCheckResult);
    }
    let PositionCheckResult = await commonHelper.checkPosition(params);
    if (
      PositionCheckResult &&
      PositionCheckResult.error !== undefined &&
      PositionCheckResult.error
    ) {
      return res.send(PositionCheckResult);
    }
  
   
    if (params.name) {
      checkNews.name = params.name;
    }
    if (params.content) {
      checkNews.content = params.content;
    }
   
    if (params.date) {
      checkNews.date = params.date;
    }
    if (imgFiles && imgFiles.length>0) {
      checkNews.image = imgFiles.map(file=>{
        return file.filename
      });
    }
    if (params.position) {
      checkNews.position = params.position;
    }
    if (params.category) {
      checkNews.category = params.category;
    }
    if (params.location) {
      checkNews.location = params.location;
    }

    var updateNews = await checkNews.save().catch((err) => {
      return {
        success: 0,
        msg: "Something went wrong while updating News",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
    if (
      updateNews &&
      updateNews.success !== undefined &&
      updateNews.success === 0
    ) {
      delete updateNews.success;
      return res.send(updateNews);
    }
    return res.send({
      data: updateNews,
      msg: "News updated successfully..",
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "Invalid News",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};
exports.listToday = async (req, res) => {
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
 
   let newsList = await News.find(findCriteria)
     .limit(perPage)
     .skip(offset)
     .sort({
       createdAt: -1,
     }).limit(5)
     .catch((error) => {
       console.log(error);
       return {
         msg: "Something went wrong while listing News",
         statusCode: 400,
         error: true,
         data: null,
       };
     });
   if (newsList && newsList.error !== undefined && newsList.error) {
     return res.send(newsList);
   }
 
   let newsCount = await News.countDocuments(findCriteria).catch((error) => {
     console.log(error);
     return {
       msg: "Something went wrong while getting News count",
       statusCode: 400,
       error: true,
       data: null,
     };
   });
   if (newsCount && newsCount.error !== undefined && newsCount.error) {
     return res.send(newsCount);
   }
 
   let totalPages = newsCount / perPage;
   totalPages = Math.ceil(totalPages);
   var hasNextPage = page < totalPages;
   let data = {
     totalPages,
     hasNextPage,
     perPage,
     items: newsList,
   };
   return res.send({
     data,
     msg: "News list",
     statusCode: 200,
     error: false,
   });
 };
