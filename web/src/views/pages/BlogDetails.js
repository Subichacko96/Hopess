import React, { Component } from "react";
import {Helmet} from "react-helmet";

import { Spinner } from "reactstrap";

import Cookie from "js-cookie";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  FacebookMessengerIcon,
  TwitterIcon,
} from "react-share";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebaseUtils";

const axios = require("axios").default;
const ConfigFile = require("../../config");


export default class BlogDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false,
      isLoaded: false,
      loading: false,
      singlenews: {},
      orginalData: [],
      categoryName: [],
      newsId: "",
      ads: [],
      news: {},
    };
  }

  GetNewsDetails = async () => {
    const url = new URL(window.location.href);
    const Id = url.searchParams.get("id");
    console.log(Id, "🍔🍔");

    await this.setState({ newsId: Id });
    console.log(this.state.newsId, "🎂");

    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/web/${this.state.newsId}/singlenews`, config)
      .catch(function (error) {
        console.log(error);
      });

    // console.log();
    console.log(response, "👇👇👇👇👇👇👇👇👇👇");
    if (response && response.data !== null) {
      this.setState({
        singlenews: response.data.data,
        orginalData: response.data.data,
        isLoaded: true,
      });
      logEvent(analytics, 'hopes_load_news', {
        news_id: this.state.newsId,
        title: response.data.data.name,
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
    // console.log(this.state.singlenews, "hai");
  };
  GetAllAds = async () => {
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
  GetAllNews = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let newsresponse = await axios
      .get(`${ConfigFile.BASE_URL}/web/list`, config)
      .catch(function (error) {
        console.log(error);
      });

    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (newsresponse && newsresponse.data !== null) {
      this.setState({
        news: newsresponse.data.data,
        isLoaded: true,
      });
    } else if (newsresponse && newsresponse.data.statusCode !== 200) {
      this.setState({
        error: true,
        errorCode: newsresponse.data.msg,
      });
    } else {
      this.setState({
        status: false,
      });
    }
    //  console.log(this.state.ads, "hai");
  };

  componentDidMount() {
    this.GetNewsDetails();
    this.GetAllAds();
    this.GetAllNews();
  }

  adsPositionOne = () => {
    if (
      this.state.ads &&
      this.state.ads.find((element) => element.position === "top")
    ) {
      let topPosition = this.state.ads.find(
        (element) => element.position === "top"
      );
      // console.log(positionOne, "news here");
      return (
        <>
          <h5 className="widget-title">{topPosition.adsname}</h5>

          <div className="axil-search form-group">
            <a href={topPosition.link}>
              <img
                className="w-100"
                src={`${ConfigFile.BASE_URL}/uploads/${topPosition.image}`}
                alt="Banner Images"
              />
            </a>
          </div>
        </>
      );
    }
  };
  adsPositionTwo = () => {
    if (
      this.state.ads &&
      this.state.ads.find((element) => element.position === "left")
    ) {
      let leftPosition = this.state.ads.find(
        (element) => element.position === "left"
      );
      // console.log(positionOne, "news here");
      return (
        <>
          <div className="thumbnail">
            <a href={leftPosition.link}>
              <img
                src={`${ConfigFile.BASE_URL}/uploads/${leftPosition.image}`}
                alt="Ads Images"
              />
            </a>
          </div>
        </>
      );
    }
  };
  adsPositionThree = () => {
    if (
      this.state.ads &&
      this.state.ads.find((element) => element.position === "center")
    ) {
      let centerPosition = this.state.ads.find(
        (element) => element.position === "center"
      );
      // console.log(positionOne, "news here");
      return (
        <>
          <h5 className="widget-title">{centerPosition.adsname}</h5>
          {/* <!-- Start Post List  --> */}
          <div className="post-medium-block">
            <div className="post-thumbnail">
              <a href={centerPosition.link}>
                <img
                  src={`${ConfigFile.BASE_URL}/uploads/${centerPosition.image}`}
                  // style={{ height: "300px" }}
                  alt="Post Images"
                />
              </a>
            </div>
          </div>
        </>
      );
    }
  };
  adsPositionFour = () => {
    if (
      this.state.ads &&
      this.state.ads.find((element) => element.position === "right")
    ) {
      let rightPosition = this.state.ads.find(
        (element) => element.position === "right"
      );
      // console.log(positionOne, "news here");
      return (
        <>
          {/* <!-- Start Post List  --> */}
          <div className="thumbnail">
            <a href={rightPosition.link}>
              <img
                src={`${ConfigFile.BASE_URL}/uploads/${rightPosition.image}`}
                alt="Ads Images"
              />
            </a>
          </div>
        </>
      );
    }
  };
  adsPositionFive = () => {
    if (
      this.state.ads &&
      this.state.ads.find((element) => element.position === "bottom")
    ) {
      let bottomPosition = this.state.ads.find(
        (element) => element.position === "bottom"
      );
      // console.log(positionOne, "news here");
      return (
        <>
          <figure className="wp-block-image">
            <a href={bottomPosition.link}>
              <img
                src={`${ConfigFile.BASE_URL}/uploads/${bottomPosition.image}`}
                alt="Post Images"
              />
            </a>
          </figure>
        </>
      );
    }
  };

  getSingleNews = () => {
    if (
      this.state.singlenews &&
      this.state.singlenews.image &&
      this.state.singlenews.image.length > 0
    ) {
      let details = this.state.singlenews;
      let splited_content = details.content.split(ConfigFile.TAG);
      return (
        <>
        <Helmet>
            <title>{`${details.name}`}</title>
            <meta property="og:title" content={`${details.name}`} />
            <meta property="og:url" content={`${window.location.origin}/blog/detail?id=${details._id}`} />
            <meta property="og:image" content="https://samplelib.com/lib/preview/png/sample-bumblebee-400x300.png"/>
            <meta property="og:description" content={`${splited_content[0]}`}/>  
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />
        </Helmet>
          <div className="banner banner-single-post post-formate post-layout ">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Start Single Slide  --> */}
                  <div className="content-block">
                    {/* <!-- Start Post Content  --> */}
                    <div className="post-content">
                      <div className="post-cat">
                        <div className="post-cat-list">
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item text-uppercase fw-bold">
                              <span data-text={details.category}>
                                {details.category}
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                      <h1 className="title-details text-uppercase">
                        {details.name}
                      </h1>
                      {/* <!-- Post Meta  --> */}
                      <div className="post-meta-wrapper">
                        <div className="post-meta">
                          <div className="content">
                            <h6 className="post-author-name">
                              <a className="hover-flip-item-wrapper">
                                <span className="hover-flip-item fw-bold">
                                  <span
                                    className="fs-4"
                                    data-text={new Date(
                                      details.date
                                    ).toLocaleDateString("es-CL")}
                                  >
                                    {new Date(details.date).toLocaleDateString(
                                      "es-CL"
                                    )}
                                  </span>
                                </span>
                              </a>
                            </h6>
                          </div>
                        </div>

                       
                      </div>
                    </div>
                    {/* <!-- End Post Content  --> */}
                  </div>
                  {/* <!-- End Single Slide  --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Banner Area --> */}

          <div className="axil-post-details axil-section-gapBottom">
            {splited_content.map((value, index) => {
              console.log(index, "🍫🧁");
              if (details && details.image && details.image.length > index) {
                return (
                  <>
                  <br/>
                    <figure className="wp-block-image pb-2">
                      <img
                        className=""
                        src={`${ConfigFile.BASE_URL}/uploads/${details.image[index]}`}
                        alt="Post Images"
                      />
                    </figure>
                    <p className="axil-post-details-new" style={{textAlign: "justify"}}>&emsp;&emsp;{value}</p>
                  </>
                );
              }
              return (
                <>
                  <p className="axil-post-details-new" style={{textAlign: "justify"}}>&emsp;&emsp;{value}</p>
                </>
              );
            })}
          </div>
         
          <div className="social-share-block mb-3">
                        <div className="post-like"></div>
          <ul className="social-share-transparent justify-content-end ">
            <li style={{color:"blue"}}>Share On Social Media</li>
                          <li>
                            <FacebookShareButton
                              // url={window.location.href}
                              url={`${window.location.origin}/blog/detail?id=${details._id}`}
                              hashtag="#Hopes Club"
                              className="Demo__some-network__share-button"
                            >
                              <FacebookIcon size={30} round />
                            </FacebookShareButton>
                            {/* <a href="https://www.facebook.com/sharer/sharer.php?u=">
                            <i className="fab fa-facebook-f"></i>
                          </a> */}
                          </li>
                          {/* <li>
                          <FacebookMessengerShareButton
                            // url={window.location.href}
                            redirectUri={`${ConfigFile.BASE_URL}/blog/detail?id=${details._id}`}
                            
                            title={details.name}
                            className="Demo__some-network__share-button"
                          >
                            <FacebookMessengerIcon size={30} round />
                          </FacebookMessengerShareButton>
                        </li> */}
                          <li>
                            <WhatsappShareButton
                              // url={window.location.href}
                              url={`${window.location.origin}/blog/detail?id=${details._id}`}
                              title={details.name}
                              separator={`\n`}
                              className="Demo__some-network__share-button"
                            >
                              <WhatsappIcon size={30} round />
                            </WhatsappShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
                              // url={window.location.href}
                              url={`${window.location.origin}/blog/detail?id=${details._id}`}
                              title={details.name}
                              className="Demo__some-network__share-button"
                            >
                              <TwitterIcon size={30} round />
                            </TwitterShareButton>
                          </li>
                        </ul><br/>
                        </div> <hr className="mb-5"/>
        </>
      );
    }
  };
  popularNewsData = () => {
    return (
      <>
        {this.state.news &&
          this.state.news.popularNews &&
          this.state.news.popularNews.map((data, key) => {
            return (
              <>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                  {/* <!-- Start Post List  --> */}

                  <div class="post-stories content-block mt--30">
                    <div class="post-thumbnail">
                      <a href={`/blog/detail?id=${data._id}`}>
                        <img
                          src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`}
                        />
                      </a>
                    </div>
                    <div class="post-content">
                      <div class="post-cat">
                        <div class="post-cat-list">
                          <a
                            href="#"
                            className="text-uppercase font-weight-bold"
                          >
                            {data.category}
                          </a>
                        </div>
                      </div>
                      <h5 class="title">
                        <a href={`/blog/detail?id=${data._id}`}>{data.name}</a>
                      </h5>
                      <br/>
                      <p style={{fontSize:"16px",textAlign:"justify"}}>{data.content.substring(0,100)}
                  <a href={`/blog/detail?id=${data._id}`}>&nbsp;read more</a>
                  </p>
                      <br/><br/><hr style={{color:"gray"}}/>
                    </div>
                  </div>

                  {/* <!-- End Post List  --> */}
                </div>
              </>
            );
          })}
      </>
    );
  };

  render() {
    //let details = this.state.singlenews;
    if (this.state.isLoaded) {
      return (
        <>
          <div className="main-wrapper">
            <div className="mouse-cursor cursor-outer"></div>
            <div className="mouse-cursor cursor-inner"></div>
            {/* start section */}
            <div className="post-single-wrapper axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    {/* <!-- Start Banner Area --> */}
                    <div className="post-content">
                      {/* post here */}
                      <this.getSingleNews />
                    </div>

                    {/* ads 5 */}
                    <this.adsPositionFive />
                    {/* end ads5 */}
                  </div>
                  <div className="col-lg-4">
                    {/* <!-- Start Sidebar Area  --> */}
                    <div className="sidebar-inner">
                      {/* <!-- Start Single Widget  --> */}
                      <div className="axil-single-widget widget widget_search mb--30">
                        <this.adsPositionOne />
                      </div>
                      {/* <!-- End Single Widget  --> */}

                      {/* <!-- Start Single Widget  --> */}
                      <div className="axil-banner">
                        <this.adsPositionTwo />

                        {/* <!-- End Post List  --> */}
                      </div>

                      <div className="axil-single-widget widget widget_social mb--30">
                        <h5 className="widget-title">Stay In Touch</h5>
                        {/* <!-- Start Post List  --> */}
                        <ul className="social-icon md-size justify-content-center">
                        <li>
                            <a href="https://www.facebook.com/thehopesclub">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://instagram.com/hopes.club">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.youtube.com/channel/UCcbkGPeYFI9EN1AwPigsadQ/videos">
                              <i className="fab fa-youtube"></i>
                            </a>
                          </li>
                         
                    
                        </ul>
                        {/* <!-- End Post List  --> */}
                      </div>
                      {/* <!-- End Single Widget  --> */}

                      <div className="axil-banner">
                        <this.adsPositionFour />
                      </div>

                      <div className="axil-single-widget widget widget_postlist mb--30">
                        {/* <this.adsPositionThree /> */}
                      </div>
                    </div>
                    {/* <!-- End Sidebar Area  --> */}
                  </div>
                </div>
                <div className="row">
                  <div class="axil-more-stories-area axil-section-gap m-4 mr--10">
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="section-title">
                            <h1 class="text-uppercase font-weight-bold">
                              <strong>More News</strong>
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        {/* <!-- Start Stories Post  --> */}

                        <this.popularNewsData />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End section */}

            <a id="backto-top"></a>
            {/* <!-- End Back To Top  --> */}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className=" d-flex justify-content-center mr-mt-md-4">
            <Spinner
              style={{ width: "3rem", height: "3rem" }}
              type="grow"
              color="warning"
            />
          </div>
        </>
      );
    }
  }
}
