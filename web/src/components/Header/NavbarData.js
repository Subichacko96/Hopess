import React, { Component } from "react";
// import "../../assets/images/logo"
import "../../assets/css/custom/custom.css"
import "../../assets/css/style.css"
import "../../assets/css/vendor/base.css"
import "../../assets/css/vendor/bootstrap.min.css"
import "../../assets/css/vendor/font-awesome.css"
import "../../assets/css/vendor/slick-theme.css"
import "../../assets/css/vendor/slick.css"
import "../../assets/css/plugins/plugins.css"
import "../../assets/css/hopestyle.css"
import mainLogo from'../../assets/images/hopeslogo.png';
import Cookie from "js-cookie";

const axios = require("axios").default;
const ConfigFile = require("../../config");

class NavbarData extends React.Component {
  state = {
    success: false,
    error: false,
    // isRedirect:false,
    isLoaded: false,
    loading: false,
  
    ads: [],
    
  };

  componentDidMount() {
   
    this.Getads();
    
  }

  Getads = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/web/adsall`, config)
      .catch(function (error) {
        console.log(error);
      });

    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (response && response.data && response.data.data !== null) {
      this.setState({
        ads: response.data.data.items,
        isLoaded: true,
      });
    } else if (response && response.data.statusCode !== 200) {
      this.setState({
        error: true,
        errorCode: response.data.msg,
      });
    } else {
      this.setState({
        status: false,
      });
    }
    //  console.log(this.state.ads, "hai");
  };

  adsPositionSix = () => {
    if (
      this.state.ads &&
      this.state.ads.find((element) => element.position === "top-most")
    ) {
      let topMostPosition = this.state.ads.find(
        (element) => element.position === "top-most"
      );
      // console.log(positionOne, "news here");
      return (
        <>
          {/* <h5 className="widget-title">{bottomPosition.adsname}</h5> */}
          {/* <!-- Start Post List  --> */}
          <a href={topMostPosition.link}>
         
            <div class="banner-add text-end">
                <a>
                   <img  src={`${ConfigFile.BASE_URL}/uploads/${topMostPosition.image}`} alt="Add images"/>
                </a>
            </div>
          </a>
        </>
      );
    }
  };
  
  render() {
    
    var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today =  dayOfMonth +" " + curMonth +" " + curYear+"," +dayOfWeek;
var time=curHour + ":" + curMinute +" "+ curMeridiem ;
    return (
     
      <>
          {/* <!-- Start Header --> */}
          
       
          <header className="header axil-header header-style-3  header-light header-sticky">
        
            <div className="header-middle">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="logo">
                                <a href="#">
                                    <img class="dark-logo" src={mainLogo}  alt="Logo Images"/>
                                    <img class="light-logo" src={mainLogo}  alt="Logo Images"/>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-8 col-sm-6">
                            {/* ad here  */}
                            <this.adsPositionSix/>
                        </div>
                    </div>
                </div>
            </div>
           {/* bottom */}
           

           <div class="header-bottom bg-dark">
                <div class="row justify-content-between align-items-center">
                    <div class="col-xl-7 col-12">
                        <div class="mainmenu-wrapper align-items-center justify-content-center justify-content-md-start">
                            <nav class="mainmenu-nav justify-content-center ml--110">
                                {/* <!-- Start Mainmanu Nav --> */}
                                <ul class="mainmenu">
                                 
                                    <li class="menu-item-has-children"><a className="fw-bold " href="/" style={{color:'white'}}><i class="fa fa-home" style={{color:"white"}}></i></a>
                                       
                                    </li>
                                  
                                    <li></li>

                                    <li class="menu-item-has-children"><a  className="fw-bold pl-2" href="/blog" style={{color:'white'}}><i class="fa fa-list"></i></a>
                                        {/* <ul class="axil-submenu">
                                            <li>
                                                <a class="hover-flip-item-wrapper" href="post-format-standard.html">
                                                    <span class="hover-flip-item">
                        <span data-text="Post Format Standard">Post Format Standard</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="hover-flip-item-wrapper" href="post-format-video.html">
                                                    <span class="hover-flip-item">
                        <span data-text="Post Format Video">Post Format Video</span>
                                                    </span>
                                                </a>
                                            </li>
                                            {/* end 
                                </ul> */}
                                </li>
                                </ul>
                                {/* <!-- End Mainmanu Nav --> */}
                            </nav>
                        </div>
                    </div>
                    <div class="col-xl-4 col-12">
                        <div class="header-search d-flex flex-wrap align-items-center justify-content-center justify-content-xl-end">
                        <div class="header-top-bar d-flex flex-wrap align-items-center justify-content-center justify-content-md-start">
                                <ul class="header-top-date liststyle d-flex flrx-wrap align-items-center mr--20">
                                    <li><a className="fw-bold" style={{color:'white'}}>{today} &nbsp;{time}</a></li>
                                </ul>
                             
                              
                            </div>
                          
                            
                           
                          
                          
                        </div>
                    </div>
                </div>
            </div>
           
          </header>
          <div className="col-xl-5 col-12">
                  <div className="header-search d-flex flex-wrap align-items-center justify-content-center justify-content-xl-end">
                  <div id="my_switcher" class="my_switcher">
            <ul>
                <li>
                    <a href="javascript: void(0);" data-theme="light" class="setColor light">
                        <span title="Light Mode">Light</span>
                    </a>
                </li>
                <li>
                    <a href="javascript: void(0);" data-theme="dark" class="setColor dark">
                        <span title="Dark Mode">Dark</span>
                    </a>
                </li>
            </ul>

        </div>
        </div>
        </div>
          
      </>
    );
  }
}

export default NavbarData;
