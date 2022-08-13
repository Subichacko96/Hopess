const News = require("../models/news.models");
const Ads = require("../models/ads.models");
const constants = require("../utils/constants");



module.exports = {
  checkPosition: async function(params) {
    let positionType = params.position;

    if (positionType === constants.NOPREFERENCE) {
      return {
        msg: "OK",
        statusCode: 200,
        error: false,
        data: null,
      };
    } else {
        var findCriteria = {
            position:params.position,
            status:1
          }
          let checkPositionData = await News.findOne(findCriteria)
            .catch(
              (error) => {
                console.log(error);
                return {
                  msg: 'Something went wrong while updating position',
                  statusCode: 400,
                  error: true,
                  data: null,
                };
              }
            );
          if (checkPositionData && checkPositionData.error !== undefined && checkPositionData.error) {
            return checkPositionData;
          }
          if (checkPositionData && checkPositionData !== null) {
            return {
              msg: 'position name already exists',
              statusCode: 400,
              error: true,
              data: null,
            };
          } else{
          return {
            msg: 'OK',
            statusCode: 200,
            error: false,
            data: null,
          }
    }
    }
  },
  adCheckPosition: async function(params) {
    //let adpositionType = params.position;
        var findCriteria = {
            position:params.position,
            status:1
          }
          let checkPositionData = await Ads.findOne(findCriteria)
            .catch(
              (error) => {
                console.log(error);
                return {
                  msg: 'Something went wrong while updating position',
                  statusCode: 400,
                  error: true,
                  data: null,
                };
              }
            );
          if (checkPositionData && checkPositionData.error !== undefined && checkPositionData.error) {
            return checkPositionData;
          }
          if (checkPositionData && checkPositionData !== null) {
            return {
              msg: 'position name already exists',
              statusCode: 400,
              error: true,
              data: null,
            };
          } 
    },
  checkName: async function(params){
    let findCriteria = {
      //coOrdinatorId,
       name: params.name,
       status: 1
     }
     let checkNewsName = await News.findOne(findCriteria)
       .catch(
         (error) => {
           console.log(error);
           return {
             msg: 'Something went wrong while getting service count',
             statusCode: 400,
             error: true,
             data: null,
           };
         }
       );
     if (checkNewsName && checkNewsName.error !== undefined && checkNewsName.error) {
       return checkNewsName;
     }
     if (checkNewsName && checkNewsName !== null) {
       return {
         msg: 'News name already exists',
         statusCode: 400,
         error: true,
         data: null,
       };
     }
  }
  
};
