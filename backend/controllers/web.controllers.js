const News = require("../models/news.models");
const Ads = require("../models/ads.models");
const User = require("../models/user.models");
const constants = require("../utils/constants");
const commonHelper = require("../helpers/common.helper");
var ObjectId = require("mongoose").Types.ObjectId;

exports.DashboardNews = async (req, res) => {
  let params = req.query;

  let findCriteria;
  findCriteria = {
    position: { $ne: constants.NOPREFERENCE },
    status: 1,
  };

  let newsList = await News.find(findCriteria)
    .sort({
      position: 1,
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
  //console.log(newsList, "get newss list");
  if (newsList && newsList.error !== undefined && newsList.error) {
    return res.send(newsList);
  }
  //get all no preference news
  findCriteria = {
    position: { $in: [constants.NOPREFERENCE] },
    status: 1,
  };
  let getAllList = await News.find(findCriteria)
    .sort({
      createdAt: -1,
    })
    .limit(5).skip(4)
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while listing News",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
  //console.log(getAllList, "get newss list");
  if (getAllList && getAllList.error !== undefined && getAllList.error) {
    return res.send(getAllList);
  }
  //limit news

  //list news limit 4
  findCriteria = {
    status: 1,
  };

  let limitNewsData = await News.find(findCriteria)
    .sort({
      createdAt: -1,
    })
    .limit(4)
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while listing News",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
  if (
    limitNewsData &&
    limitNewsData.error !== undefined &&
    limitNewsData.error
  ) {
    return res.send(limitNewsData);
  }
  //get single news

  let data = {
    items: newsList,
    nonPrefNews: getAllList,
    popularNews: limitNewsData,
  };

  return res.send({
    data,
    msg: "News list",
    statusCode: 200,
    error: false,
  });
};

//  All news
exports.listAllNews = async (req, res) => {
  params = req.query;
  let page = params.page || 1;
  page = page > 0 ? page : 1;
  let perPage = Number(params.limit) || constants.PER_PAGE;
  perPage = perPage > 0 ? perPage : constants.PER_PAGE;
  let offset = (page - 1) * perPage;

  //list all news
  findCriteria = {
    // coOrdinatorId,
    status: 1,
  };

  let newsListData = await News.find(findCriteria)
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
  if (newsListData && newsListData.error !== undefined && newsListData.error) {
    return res.send(newsListData);
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
    allNews: newsListData,
  };

  return res.send({
    data,
    msg: "News list",
    statusCode: 200,
    error: false,
  });
};

exports.listCategory = async (req, res) => {
  //list cat
  let findCriteria = {
    status: 1,
  };
  let projection = {
    category: 1,
  };
  var allCategoryData = await News.find(findCriteria, projection)
    .distinct("category")
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while checking Cat data",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
    console.log(allCategoryData,"please sort array")
  if (
    allCategoryData &&
    allCategoryData.error !== undefined &&
    allCategoryData.error
  ) {
    return res.status(400).send(allCategoryData);
  }

  return res.send({
    msg: "Category fetch susccessfully",
    data: allCategoryData,
    statusCode: 200,
    error: false,
  });
};
//fetch news basis of category
exports.listNewsCategory = async (req, res) => {
  let categoryName = req.query.category;
  params = req.query;
  let page = params.page || 1;
  page = page > 0 ? page : 1;
  let perPage = Number(params.limit) || constants.PER_PAGE;
  perPage = perPage > 0 ? perPage : constants.PER_PAGE;
  let offset = (page - 1) * perPage;

  let limit = parseInt(req.query.limit ?? 6);
  let findCriteria = {
    status: 1,
  };

  if (categoryName) {
    findCriteria = {
      category: categoryName,
      status: 1,
    };
  } else {
    findCriteria = {
      status: 1,
    };
  }

  var categoryData = await News.find(findCriteria)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(offset)
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while checking Cat data",
        statusCode: 400,
        error: true,
        data: null,
      };
    });

  if (categoryData && categoryData.error !== undefined && categoryData.error) {
    return res.status(400).send(categoryData);
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
    allNews: categoryData,
  };
  return res.send({
    msg: "Category fetch susccessfully",
    data,
    statusCode: 200,
    error: false,
  });
};

exports.allAds = async (req, res) => {
  // let coOrdinatorId = req.user.id;

  let findCriteria = {
    status: 1,
  };
  let adsList = await Ads.find(findCriteria)
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


  let data = {
    items: adsList,
  };

  return res.send({
    data,
    msg: "Ads list",
    statusCode: 200,
    error: false,
  });
};

//get single

exports.getSingleNewsDetail = async (req, res) => {
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
    status: 1,
  };
  var singleNewsData = await News.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while checking News data",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (
    singleNewsData &&
    singleNewsData.error !== undefined &&
    singleNewsData.error
  ) {
    return res.send(singleNewsData);
  }
  if (singleNewsData) {
    return res.send({
      msg: "News fetch susccessfully",
      data: singleNewsData,
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
