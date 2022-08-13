import React, { Component } from "react";
import { Spinner} from "reactstrap";
import "../../assets/css/custom/custom.css"
import "../../assets/css/style.css"
import "../../assets/css/vendor/base.css"
import "../../assets/css/vendor/bootstrap.min.css"
import "../../assets/css/vendor/font-awesome.css"
import "../../assets/css/vendor/slick-theme.css"
import "../../assets/css/vendor/slick.css"
import "../../assets/css/plugins/plugins.css"
import "../../assets/css/hopestyle.css"
import { Link } from "react-router-dom";
import { FacebookShareButton, WhatsappShareButton ,TwitterShareButton} from "react-share";
import { FacebookIcon, WhatsappIcon,TwitterIcon } from "react-share";

import Cookie from "js-cookie";

const axios = require("axios").default;
const ConfigFile = require("../../config");

export default class Home extends Component {
  state = {
    success: false,
    error: false,
    // isRedirect:false,
    isLoaded: false,
    loading: false,
    news: {},
    ads: [],
    categoryName: [],
    originalData: [],
    categorynews: [],
    name: "",
  };

  handleClick = async (data) => {
    //console.log(data)
    await this.setState({ name: data });
    this.tabClick();
  };

  tabClick = async () => {
    // let defaultCategory="business"

    // let catname = this.state.name?this.state.name:defaultCategory;
    let catname = this.state.name;
    console.log(catname, "hii");

    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("kkkkkkk🏑");
    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/web/list/newscategory?category=${catname}`,
        config
      )
      .catch(function (error) {
        console.log(error);
      });

    if (response && response.data !== null) {
      this.setState({
        categorynews: response.data.data.allNews,
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
    // console.log(this.state.categorynews,"🏑")
  };

  GetNewsList = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const [newsResponse, adsResponse] = await Promise.all([
      axios.get(`${ConfigFile.BASE_URL}/web/list`, config),
      axios.get(`${ConfigFile.BASE_URL}/web/adsall`, config),
    ]);
    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (
      newsResponse &&
      newsResponse.data !== null &&
      adsResponse &&
      adsResponse.data !== null
    ) {
      this.setState({
        news: newsResponse.data.data,
        ads: adsResponse.data.data.items,
        isLoaded: true,
      });
      console.log(this.state.ads, "🍳");
    } else if (
      (newsResponse && newsResponse.data.statusCode !== 200) ||
      (adsResponse && adsResponse.data.statusCode !== 200)
    ) {
      this.setState({
        error: true,
        errorCode: newsResponse.data.msg ?? adsResponse.data.msg,
      });
    } else {
      this.setState({
        status: false,
      });
    }
    // console.log(newsResponse, "web resp");
  };
  //category
  CategoryList = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/web/list/allcategory`, config)
      .then((response) => {
        if (
          !response ||
          response.data === null ||
          response.data.data.length === 0
        ) {
          return null;
        }
        this.setState({
          categoryName: response.data.data,
          isLoaded: true,
        });
        return axios.get(
          `${ConfigFile.BASE_URL}/web/list/newscategory?category=${response.data.data[0]}`,
          config
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    if (
      response === null ||
      response.data === null ||
      response.data.statusCode !== 200
    ) {
      this.setState({
        status: false,
      });
    } else {
      console.log(response.data.data, "🌵🌵");
      this.setState({
        categorynews: response.data.data.allNews,
        isLoaded: true,
      });
    }
  };

  componentDidMount() {
    this.GetNewsList();
    this.CategoryList();
    //this.tabClick();
  }

  firstPosition = () => {
    if (
      this.state.news &&
      this.state.news.items &&
      this.state.news.items.length > 0
    ) {
      let positionOne = this.state.news.items[0];
      // console.log(positionOne, "news here");
      return (
        <>
           <Link to={`/blog/detail?id=${positionOne._id}`}>
            <div className="content-block post-grid post-grid-large">
              <div className="post-thumbnail">
                <a href="#">
                  <img
                    src={`${ConfigFile.BASE_URL}/uploads/${positionOne.image[0]}`}
                    style={{ height: "700px" }}
                    alt="Post Images"
                  />
                </a>
              </div>

              <div className="post-grid-content">
                <div className="post-content">
                  <div className="post-cat">
                    <div className="post-cat-list">
                      <a className="hover-flip-item-wrapper">
                        <span className="hover-flip-item text-uppercase fw-bold">
                          <span data-text={positionOne.category}>
                            {positionOne.category}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>

                  <h3 className="firstPosition">
                    <a href="#">{positionOne.name}</a>
                  </h3>
                  <p className="axil-post-details" style={{fontSize:"16px",textAlign:"justify"}}>{positionOne.content.substring(0,141).replace(ConfigFile.TAG,"")}
                  <a href={`/blog/detail?id=${positionOne._id}`}>&nbsp;read more</a>
                  </p>

                  <div className="post-meta-wrapper">
                    <div className="post-meta">
                      <div className="content">
                        <ul className="post-meta-list">
                          <li>
                            {new Date(positionOne.date).toLocaleDateString(
                              "es-CL"
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <ul className="social-share-transparent justify-content-end">
                        <li>
                          <FacebookShareButton
                            // url={window.location}
                             url={`${window.location.origin}/blog/detail?id=${positionOne._id}`}
                            hashtag="#Hopes Club"
                            className="Demo__some-network__share-button"
                          >
                            <FacebookIcon size={30} round />
                          </FacebookShareButton>
                          {/* <a href="https://www.facebook.com/sharer/sharer.php?u=">
                            <i className="fab fa-facebook-f"></i>
                          </a> */}
                        </li>
                        <li>
                          <WhatsappShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${positionOne._id}`}
                            
                            title={positionOne.name}
                            separator={`\n`}
                            className="Demo__some-network__share-button"
                          >
                            <WhatsappIcon size={30} round />
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${positionOne._id}`}
                            
                            title={positionOne.name}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={30} round />
                          </TwitterShareButton>
                        </li>
                   
                      </ul>
                  </div>
                </div>
              </div>
            </div></Link>
          
        </>
      );
    }
  };
  rightPosition = () => {
    let array = [];
    if (
      this.state.news &&
      this.state.news.items &&
      this.state.news.items.length > 1
    )
      for (var i = 1; i < this.state.news.items.length; i++) {
        let item = this.state.news.items[i];
        array.push(
          <div className="content-block post-medium post-medium-border">
            <div className="post-thumbnail">
              <Link to={`/blog/detail?id=${item._id}`}>
                <img
                  src={`${ConfigFile.BASE_URL}/uploads/${item.image[0]}`}
                  style={{ height: "120px"}}
                  alt="Post Images"
                />{" "}
              </Link>
            </div>
            <Link to={`/blog/detail?id=${item._id}`}>
            <div className="post-content">
              <div className="post-cat">
                <div className="post-cat-list">
                  <a className="hover-flip-item-wrapper">
                    <span className="hover-flip-item text-uppercase fw-bold">
                      <span data-text={item.category}>{item.category}</span>
                    </span>
                  </a>
                </div>
              </div>

              <h5 class="title">
                {item.name}
              </h5>
              <span className="axil-post-details" style={{color:"black",fontSize:"14px"}}>{item.content.substring(0,75).replace(ConfigFile.TAG,"")}&nbsp;
                  <a href={`/blog/detail?id=${item._id}`}>read more</a>
                  </span>

              <div className="post-meta">
                <div className="content">
                  <Link to={`/blog/detail?id=${item._id}`}>
                    <ul className="post-meta-list">
                      <li>{new Date(item.date).toLocaleDateString("es-CL")}</li>
                    </ul>
                  </Link>
                </div>
              </div>
             
            </div>
            <ul className="social-share-transparent justify-content-end">
                        <li>
                          <FacebookShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${item._id}`}
                            hashtag="#Hopes Club"
                            className="Demo__some-network__share-button"
                          >
                            <FacebookIcon size={20} round />
                          </FacebookShareButton>
                          {/* <a href="https://www.facebook.com/sharer/sharer.php?u=">
                            <i className="fab fa-facebook-f"></i>
                          </a> */}
                        </li>
                        <li>
                          <WhatsappShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${item._id}`}
                            
                            title={item.name}
                            separator={`\n`}
                            className="Demo__some-network__share-button"
                          >
                            <WhatsappIcon size={20} round />
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${item._id}`}
                            
                            title={item.name}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={20} round />
                          </TwitterShareButton>
                        </li>
                   
                      </ul>
            </Link>
           
          </div>
        );
      }
    return <>{array}</>;
  };
  noPreferenceNews = () => {
    return (
      <>
        {this.state.news &&
          this.state.news.nonPrefNews &&
          this.state.news.nonPrefNews.map((data, key) => {
            return (
              <>
                <div className="content-block post-list-view axil-control mt--30 w-100">
                  <div className="post-thumbnail w-100">
                    <Link to={`/blog/detail?id=${data._id}`}>
                      <img className="w-100"
                        src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`}
                        
                        alt="Post Images"
                      />
                    </Link>
                  </div>

                  <div className="post-content">
                    <div className="post-cat">
                      <div className="post-cat-list">
                        <a className="hover-flip-item-wrapper">
                         
                            <span className="hover-flip-item text-uppercase fw-bold">
                              <span data-text={data.category}>
                                {data.category}
                              </span>
                            </span>
                          
                        </a>
                      </div>
                    </div>
                    <Link to={`/blog/detail?id=${data._id}`}>
                      <h4 className="nonpopular-title">
                        <a>{data.name}</a>
                      </h4>
                     
                      </Link>
                      <Link to={`/blog/detail?id=${data._id}`}>
                     <p className="nonpref-text" style={{textAlign: "justify"}}>{data.content.substring(0,143).replace(ConfigFile.TAG,"")}
                    
                     </p>
                     <a style={{fontSize:"17px"}} href={`/blog/detail?id=${data._id}`}>&nbsp;read more</a>
                     </Link>
                   
                    <div className="post-meta-wrapper">
                      <div className="post-meta">
                        <div className="content">
                          <Link to={`/blog/detail?id=${data._id}`}>
                            <ul className="post-meta-list">
                              <li>
                                {new Date(data.date).toLocaleDateString(
                                  "es-CL"
                                )}
                              </li>
                            </ul>
                          </Link>
                        </div>
                      </div>
                      <ul className="social-share-transparent justify-content-end">
                        <li>
                          <FacebookShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            hashtag="#Hopes Club"
                            className="Demo__some-network__share-button"
                          >
                            <FacebookIcon size={30} round />
                          </FacebookShareButton>
                          {/* <a href="https://www.facebook.com/sharer/sharer.php?u=">
                            <i className="fab fa-facebook-f"></i>
                          </a> */}
                        </li>
                        <li>
                          <WhatsappShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            
                            title={data.name}
                            separator={`\n`}
                            className="Demo__some-network__share-button"
                          >
                            <WhatsappIcon size={30} round />
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            
                            title={data.name}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={30} round />
                          </TwitterShareButton>
                        </li>
                   
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </>
    );
  };
  categoryTabs = () => {
    return (
      <>
        <ul class="axil-tab-button nav nav-tabs mt--30" role="tablist">
          {this.state.categoryName &&
            this.state.categoryName.map((data, key) => {
              return (
                <li class="nav-item p-2" role="presentation">
                  <a
                    class="nav-link active text-center text-uppercase "
                    // style={{ width: "180px" }}
                    //id="tab-two"
                    data-bs-toggle="tab"
                    // href={data}
                    // role="tab"
                    // aria-controls={key}
                    // aria-selected="true"

                    onClick={() => this.handleClick(data)}
                  >
                    {data.substring(0,12)}
                  </a>
                </li>
              );
            })}
        </ul>
      </>
    );
  };
  categoryContent = () => {
    return (
      <>
        {this.state.categorynews &&
          this.state.categorynews.map((data, key) => {
            return (
              <>
                {/* <!-- Start Stories Post  --> */}

                <div class="col-lg-4 col-md-6 col-sm-6 col-12  mb-5 ">
                  {/* <!-- Start Post List  --> */}
                  <Link to={`/blog/detail?id=${data._id}`}>
                    <div class="post-stories  m-1 mt--30 mb-5">
                      <div class="post-thumbnail">
                        <a href="#">
                          <img
                            src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`}
                            alt="Post Images"
                            //  style={{ width: "370px", height: "250px" }}
                          />
                        </a>
                      </div>
                      <div class="post-content">
                        <div class="post-cat">
                          <div class="post-cat-list">
                            <a href="#" className="text-uppercase fw-bold">
                              {data.category}
                            </a>
                          </div>
                        </div>

                        <h5 class="popular-title">
                          <a>{data.name.substring(0, 200)}</a>
                        </h5>
                        <p className="axil-post-details" style={{fontSize:"16px",textAlign:"justify"}}>{data.content.substring(0,100).replace(ConfigFile.TAG,"")}
                  <a href={`/blog/detail?id=${data._id}`}>&nbsp;read more</a>
                  </p>

                        <div className="post-meta pt-4">
                          <div className="content">
                            <ul className="post-meta-list">
                              <li>
                                {" "}
                                {new Date(data.date).toLocaleDateString(
                                  "es-CL"
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                       <ul className="social-share-transparent justify-content-end">
                        <li>
                          <FacebookShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            hashtag="#Hopes Club"
                            className="Demo__some-network__share-button"
                          >
                            <FacebookIcon size={30} round />
                          </FacebookShareButton>
                          {/* <a href="https://www.facebook.com/sharer/sharer.php?u=">
                            <i className="fab fa-facebook-f"></i>
                          </a> */}
                        </li>
                        <li>
                          <WhatsappShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            
                            title={data.name}
                            separator={`\n`}
                            className="Demo__some-network__share-button"
                          >
                            <WhatsappIcon size={30} round />
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            
                            title={data.name}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={30} round />
                          </TwitterShareButton>
                        </li>
                   
                      </ul>
                    </div>
                  </Link>
                  {/* <!-- End Post List  --> */}
                  {/* <Link className="axil-button button-rounded color-secondary-alt" to={`/${data.category}/category/all`}>Read More</Link> */}
                </div>

                {/* <!-- Start Stories Post  --> */}
              </>
            );
          })}
      </>
    );
  };
  popularNewsData = () => {
    return (
      <>
        {this.state.news &&
          this.state.news.popularNews &&
          this.state.news.popularNews.map((data, key) => {
            return (
              <>
                <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                  <div className="row">
                    <Link to={`/blog/detail?id=${data._id}`}>
                      <div className="col-xl-12 col-lg-12 col-md-6 col-12">
                        {/* <!-- Start Post Grid  --> */}
                        <div className="content-block post-grid mt--30">
                          <div className="post-thumbnail">
                            <a href="#">
                              <img
                                src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`}
                                alt="Post Images"
                                style={{ height: "380px" }}
                              />
                            </a>
                          </div>
                          <div className="post-grid-content">
                            <div className="post-content">
                              <div className="post-cat">
                                <div className="post-cat-list">
                                  <a
                                    className="hover-flip-item-wrapper"
                                    href="#"
                                  >
                                    <span className="hover-flip-item text-uppercase fw-bold">
                                      <span data-text={data.category}>
                                        {data.category}
                                      </span>
                                    </span>
                                  </a>
                                </div>
                              </div>

                              <h5 className="popular-title">
                                <a href="#">{data.name.substring(0, 150)}</a>
                              </h5>
                              <p className="axil-post-details-popular" style={{fontSize:"15px",textAlign:"justify"}}>{data.content.substring(0,75).replace(ConfigFile.TAG,"")}
                  <a href={`/blog/detail?id=${data._id}`}>&nbsp;read more</a>
                  </p>

                              <div className="post-meta pt-4">
                                <div className="content">
                                  <ul className="post-meta-list">
                                    <li>
                                      {" "}
                                      {new Date(data.date).toLocaleDateString(
                                        "es-CL"
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <ul className="social-share-transparent justify-content-end">
                        <li>
                          <FacebookShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            hashtag="#Hopes Club"
                            className="Demo__some-network__share-button"
                          >
                            <FacebookIcon size={30} round />
                          </FacebookShareButton>
                          {/* <a href="https://www.facebook.com/sharer/sharer.php?u=">
                            <i className="fab fa-facebook-f"></i>
                          </a> */}
                        </li>
                        <li>
                          <WhatsappShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            
                            title={data.name}
                            separator={`\n`}
                            className="Demo__some-network__share-button"
                          >
                            <WhatsappIcon size={30} round />
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            // url={window.location.href}
                            url={`${window.location.origin}/blog/detail?id=${data._id}`}
                            
                            title={data.name}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={30} round />
                          </TwitterShareButton>
                        </li>
                   
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* <!-- Start Post Grid  --> */}
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
      </>
    );
  };
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
          <a href={topPosition.link}>
            <div className="thumbnail">
              <img
                className="w-100"
                src={`${ConfigFile.BASE_URL}/uploads/${topPosition.image}`}
                // style={{ height: "300px", width: "300px" }}
                alt="Banner Images"
              />
            </div>
          </a>
        </>
      );
    }
  };
  adsPositionTwo = () => {
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
          <a href={centerPosition.link}>
            <div className="thumbnail">
              <img
                className="w-100"
                src={`${ConfigFile.BASE_URL}/uploads/${centerPosition.image}`}
                // style={{ height: "250px" }}
                alt="Banner Images"
              />
            </div>
          </a>
        </>
      );
    }
  };
  adsPositionThree = () => {
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
          <a href={leftPosition.link}>
            <h4 className="widget-title">{leftPosition.adsname}</h4>
            {/* <!-- Start Post List  --> */}
            <div className="post-medium-block">
              {/* <!-- Start Single Post  --> */}
              <div className="post-medium mb--20">
                <div className="thumbnail">
                 
                    <img
                      className="w-100"
                      src={`${ConfigFile.BASE_URL}/uploads/${leftPosition.image}`}
                      alt="Banner Images"
                    />
                 
                </div>
              </div>
              {/* <!-- End Single Post  --> */}

              {/* <!-- End Single Post  --> */}
            </div>
          </a>
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
          <a href={rightPosition.link}>
            <h5 className="widget-title">{rightPosition.adsname}</h5>
            {/* <!-- Start Post List  --> */}
            <div className="post-medium-block">
              {/* <!-- Start Single Post  --> */}
              <div className="post-medium mb--20">
                <div className="thumbnail">
                  <img
                    className="w-100"
                    src={`${ConfigFile.BASE_URL}/uploads/${rightPosition.image}`}
                    alt="Banner Images"
                  />
                </div>
              </div>
              {/* <!-- End Single Post  --> */}

              {/* <!-- End Single Post  --> */}
            </div>
          </a>
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
          {/* <h5 className="widget-title">{bottomPosition.adsname}</h5> */}
          {/* <!-- Start Post List  --> */}
          <a href={bottomPosition.link}>
            <div className="thumbnail">
              <img
                className="w-100"
                src={`${ConfigFile.BASE_URL}/uploads/${bottomPosition.image}`}
                // style={{ height: "300px" }}
                alt="Banner Images"
              />
            </div>
          </a>
        </>
      );
    }
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
            <div className="thumbnail">
              <img
                className="w-100"
                src={`${ConfigFile.BASE_URL}/uploads/${topMostPosition.image}`}
                // style={{ height: "300px" }}
                alt="Banner Images"
              />
            </div>
          </a>
        </>
      );
    }
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <>
       
          <div className="main-wrapper">
            <div className="mouse-cursor cursor-outer"></div>
            <div className="mouse-cursor cursor-inner"></div>

            {/* <!-- Start Header -->
            

        <!-- Start Mobile Menu Area  --> */}
            <div className="popup-mobilemenu-area">
              <div className="inner">
                <div className="mobile-menu-top">
                  <div className="logo">
                    <a href="index.html">
                      <img
                        className="dark-logo"
                        src="assets/images/hopeslogo.png"
                        alt="Logo Images"
                      />
                      <img
                        className="light-logo"
                        src="assets/images/hopeslogo.png"
                        alt="Logo Images"
                      />
                    </a>
                  </div>
                  <div className="mobile-close">
                    <div className="icon">
                      <i className="fal fa-times"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Mobile Menu Area  --> */}

            <h1 className="d-none">Hopes</h1>
            <div className="axil-seo-post-banner seoblog-banner axil-section-gap bg-color-grey">
              <div className="container">
                <div className="row">
                  <div className="col-xl-7 col-lg-7 col-md-12 col-12">
                    {/* <!-- Start Post Grid  --> */}
                    <this.firstPosition />
                    {/* <!-- Start Post Grid  --> */}
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-12 mt_md--30 mt_sm--30">
                    {/* <!-- Start Single Post  --> */}
                    <this.rightPosition />
                    {/* <!-- End Single Post  -->
                        <!-- Start Single Post  --> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Start Tab Area  --> */}
            <div className="axil-tab-area axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="axil-banner mb--30">
                      <this.adsPositionOne />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-lg-12">
                    <div className="section-title ">
                      <h2 className="recent-title mt-5">What's new at Hopes</h2>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-lg-12">
                    {/* <!-- Start Tab Button  --> */}
                    <this.categoryTabs />
                    {/* <!-- Start Tab Content Wrapper  --> */}
                    <div className="tab-content " id="axilTabContent">
                      <div className="single-tab-content fade show active">
                        <div className="modern-post-activation ">
                          <div className="row pt-3">
                            <this.categoryContent />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Tab Content Wrapper  --> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Tab Area  --> */}

            <div className="axil-post-grid-area axil-section-gap bg-color-grey">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title">
                      <h2 className="recent-title">Recent News</h2>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {/* <!-- Start Tab Content  --> */}
                    <div className="grid-tab-content tab-content mt--10">
                      {/* <!-- Start Single Tab Content  --> */}
                      <div
                        className="single-post-grid tab-pane fade show active"
                        id="gridone"
                        role="tabpanel"
                      >
                        <div className="row">
                          <this.popularNewsData />
                        </div>
                      </div>
                      {/* end single tab */}
                    </div>
                    {/* <!-- End Tab Content  --> */}
                  </div>
                </div>
              </div>
            </div>

            {/*<!-- Start Post List Wrapper  --> */}
            <div className="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-xl-8">
                    <div className="axil-banner">
                      <div className="row">
                        <this.adsPositionTwo />
                      </div>
                    </div>
                    {/* <!-- Start Post List  --> */}
                    <this.noPreferenceNews />
                    {/* <!-- End Post List  --> */}
                  </div>
                  <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                    {/* <!-- Start Sidebar Area  --> */}
                    <div className="sidebar-inner">
                      {/* <!-- Start Single Widget  -->  */}
                      {/* <div className="axil-single-widget widget widget_search mb--30">
                        <h5 className="widget-title">Search</h5>
                        <form action="#">
                          <div className="axil-search form-group">
                            <button type="submit" className="search-button">
                              <i className="fal fa-search"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                            />
                          </div>
                        </form>
                      </div> */}
                      {/* <!-- End Single Widget  -->

                            <!-- Start Single Widget  --> */}
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionThree />
                        {/* <!-- End Post List  --> */}
                      </div>
                      {/* <!-- End Single Widget  -->

                            <!-- Start Single Widget  --> */}
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
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionFour />
                        {/* <!-- End Post List  --> */}
                      </div>
                      {/* <!-- End Single Widget  --> */}
                    </div>
                    {/* <!-- End Sidebar Area  --> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="axil-banner mb--30">
                      <this.adsPositionFive />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a id="backto-top"></a>
          </div>
        </>
      );
    } else {
      return (
        <div className=" d-flex justify-content-center mr-mt-md-4">
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            type="grow"
            color="warning"
          />
        </div>
      );
    }
  }
}
