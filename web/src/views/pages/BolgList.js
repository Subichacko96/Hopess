import React, { Component } from "react";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
import { FacebookShareButton, WhatsappShareButton,TwitterShareButton} from "react-share";
import { FacebookIcon, WhatsappIcon ,TwitterIcon} from "react-share";

const axios = require("axios").default;
const ConfigFile = require("../../config");

export default class BlogList extends Component {
  state = {
    success: false,
    error: false,
    // isRedirect:false,
    isLoaded: false,
    loading: false,
    news: {},
    ads: [],
    originalData: [],
    limit: 20,
    page: 1,
    hasNextPage: false,
    catgname: "",
  };

  handleClick = async (data, p) => {
    let page = p ? p : 1;
    let limit = this.state.limit;
    this.setState({ catgname: data, page: page });
    // console.log(`/web/list/newscategory?category=${data}&page=${page}&limit=${limit}`, "🥩🍗");
    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/web/list/newscategory?category=${data}&page=${page}&limit=${limit}`
      )
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
      this.setState({
        news: response.data.data,
        isLoaded: true,
      });
    }
  };
  GetNewsList = async (p) => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let page = p ? p : this.state.page;
    let limit = this.state.limit;
    console.log(this.state.page, "--------------");

    const [response, adsresponse] = await Promise.all([
      axios.get(
        `${ConfigFile.BASE_URL}/web/list/all?page=${page}&limit=${limit}`,
        config
      ),
      axios.get(`${ConfigFile.BASE_URL}/web/adsall`, config),
    ]).catch(function (error) {
      console.log(error);
    });
    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (
      response &&
      response.data !== null &&
      adsresponse &&
      adsresponse.data !== null
    ) {
      this.setState({
        news: response.data.data,
        ads: adsresponse.data.data.items,
        orginalData: response.data.data,
        isLoaded: true,
      });
    } else if (
      (response && response.data.statusCode !== 200) ||
      (adsresponse && adsresponse.data.statusCode !== 200)
    ) {
      this.setState({
        error: true,
        errorCode: response.data.msg ?? adsresponse.data.msg,
      });
    } else {
      this.setState({
        status: false,
      });
    }
    console.log(response, "web resp");
  };
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
        categorynews: response.data.data,
        isLoaded: true,
      });
    }
  };
  componentDidMount() {
    this.GetNewsList();
    this.CategoryList();
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
          <a href={topPosition.link}>
            <h5 className="widget-title">{topPosition.adsname}</h5>
            {/* <!-- Start Post List  --> */}
            <div className="post-medium-block">
              <div className="content-block post-medium mb--20">
                <div className="thumbnail">
                  <img
                    className="w-100"
                    src={`${ConfigFile.BASE_URL}/uploads/${topPosition.image}`}
                    alt="Banner Images"
                  />
                </div>
              </div>
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
            <h5 className="widget-title">{centerPosition.adsname}</h5>
            {/* <!-- Start Post List  --> */}
            <div className="post-medium-block">
              <div className="content-block post-medium mb--20">
                <div className="thumbnail">
                  <img
                    className="w-100"
                    src={`${ConfigFile.BASE_URL}/uploads/${centerPosition.image}`}
                    alt="Banner Images"
                  />
                </div>
              </div>
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
            <h5 className="widget-title">{leftPosition.adsname}</h5>
            {/* <!-- Start Post List  --> */}
            <div className="post-medium-block">
              <div className="post-thumbnail">
                <img
                  src={`${ConfigFile.BASE_URL}/uploads/${leftPosition.image}`}
                  // style={{ height: "300px" }}
                  alt="Post Images"
                />
              </div>
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
              <div className="content-block post-medium mb--20">
                <div className="thumbnail">
                  <img
                    className="w-100"
                    src={`${ConfigFile.BASE_URL}/uploads/${rightPosition.image}`}
                    alt="Banner Images"
                  />
                </div>
              </div>
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
          <a href={bottomPosition.link}>
            <h5 className="widget-title">{bottomPosition.adsname}</h5>
            {/* <!-- Start Post List  --> */}

            <div className="post-thumbnail w-100">
              <img
                className="w-100"
                src={`${ConfigFile.BASE_URL}/uploads/${bottomPosition.image}`}
                // style={{ height: "300px" }}
                alt="Post Images"
              />
            </div>
          </a>
        </>
      );
    }
  };

  allNewslist = () => {
    return (
      <>
        {this.state.news &&
          this.state.news.allNews &&
          this.state.news.allNews.map((data, key) => {
            return (
              <Link to={`/blog/detail?id=${data._id}`}>
                <div className="content-block post-list-view mt--30 mb--30">
                  <div className="post-thumbnail">
                    <a href="post-details.html">
                      <img
                        src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`}
                        alt="Post Images"
                      />
                    </a>
                  </div>
                  <div className="post-content">
                    <div className="post-cat">
                      <div className="post-cat-list">
                        <a className="hover-flip-item-wrapper" href="#">
                          <span className="hover-flip-item text-uppercase fw-bold">
                            <span data-text={data.category}>
                              {data.category}
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>

                    <h6 className="list-title">
                      <a href="#">{data.name}</a>
                    </h6>

                    <h6 className="title mt-3 pt-3">
                      <a href="#">{data.content.substring(0, 200).replace(ConfigFile.TAG,"")} <a href={`/blog/detail?id=${data._id}`} style={{color:"blue"}}>&nbsp;read more</a></a>
                    </h6>
                    <div className="post-meta-wrapper">
                      <div className="post-meta">
                        <div className="content">
                          <h6 className="post-author-name">
                            <a className="hover-flip-item-wrapper" href="#">
                              {/* <span className="hover-flip-item">
                                                        <span data-text="Rahabi Khan">Rahabi Khan</span>
                                                    </span> */}
                            </a>
                          </h6>
                          <ul className="post-meta-list">
                            <li>
                              {new Date(data.date).toLocaleDateString("es-CL")}
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
              </Link>
            );
          })}
      </>
    );
  };

  // categoryTitle = () => {
  //   return (
  //     <>
  //       <ul
  //         class="axil-tab-button nav nav-tabs mt--30 w-100 m-2 p-2"
  //         role="tablist"
  //       >
  //         {this.state.categoryName &&
  //           this.state.categoryName.map((data, key) => {
  //             return (
  //               <li className="cat-item" onClick={() => this.handleClick(data)}>
  //                 <a className="inner">
  //                   <div className="thumbnail ml-2">
  //                     <img
  //                       className=""
  //                       src="assets/images/category.png"
  //                       alt=""
  //                     />
  //                   </div>
  //                   <div className="content">
  //                     <h6 className="category-title text-uppercase">
  //                       {data.substring(0, 12)}
  //                     </h6>
  //                   </div>
  //                 </a>
  //               </li>
  //             );
  //           })}
  //       </ul>
  //     </>
  //   );
  // };



  categoryTitle = () => {
    return (
      <>
        {/* <ul
          class="axil-tab-button nav nav-tabs mt--30 w-100 m-2 p-2"
          role="tablist"
        >
          {this.state.categoryName &&
            this.state.categoryName.map((data, key) => {
              return (
                <li className="cat-item" onClick={() => this.handleClick(data)}>
                  <a className="inner">
                    <div className="thumbnail ml-2">
                      <img
                        className=""
                        src="assets/images/category.png"
                        alt=""
                      />
                    </div>
                    <div className="content">
                      <h6 className="category-title text-uppercase">
                        {data.substring(0, 12)}
                      </h6>
                    </div>
                  </a>
                </li>
              );
            })}
        </ul> */}

        {/* ul */}
        <ul class="axil-tab-button nav nav-tabs mt--30" role="tablist">
        {this.state.categoryName &&
            this.state.categoryName.map((data, key) => {
              return (
                <li class="nav-item p-2" role="presentation">
                  <a
                    class="nav-link active text-center text-uppercase"
                    //style={{ width: "160px" }}
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
  Pagination = () => {
    let totalPages = this.state.news ? this.state.news.totalPages : 0;
    let currentPage = this.state.page;
    let pageItems = Array.apply(null, Array(totalPages)).map(function (x, i) {
      return i;
    });
    return (
      <>
        <nav aria-label="Page navigation example">
          <Pagination
            className="pagination justify-content-end"
            listClassName="justify-content-end"
          >
            {pageItems.map((item, key) => {
              if (currentPage === key + 1) {
                return (
                  <PaginationItem className="active">
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      {key + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ page: key + 1 });
                        //this.GetNewsList(key + 1);
                        this.handleClick(this.state.catgname, key + 1);
                      }}
                    >
                      {key + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            })}
          </Pagination>
        </nav>
      </>
    );
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <>
          <div className="main-wrapper">
            <div className="mouse-cursor cursor-outer"></div>
            <div className="mouse-cursor cursor-inner"></div>

            {/* <!-- Start Breadcrumb Area  --> */}
            <div className="axil-breadcrumb-area  bg-color-grey">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="inner mb-5 justify-content-between">
                      <span className="recent-title w-100"><this.categoryTitle/></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Breadcrumb Area  --> */}
            {/* <!-- Start Post List Wrapper  --> */}
            <div className="axil-post-list-area axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-xl-8">
                    <this.allNewslist />

                    {/*  */}
                  </div>

                  <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                    {/* <!-- Start Sidebar Area  --> */}
                    <div className="sidebar-inner">
                      {/* <!-- Start Single Widget  --> */}
                      {/* <div className="axil-single-widget widget widget_categories mb--30">
                        <ul>
                          <this.categoryTitle />
                        </ul>
                      </div> */}
                      {/* <!-- End Single Widget  --> */}

                      {/* <!-- Start Single Widget  --> */}
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionOne />
                      </div>
                      {/* <!-- End Single Widget  --> */}

                      {/* <!-- Start Single Widget  --> */}
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

                      {/* <!-- Start Single Widget  --> */}
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionTwo />
                      </div>
                      {/* <!-- End Single Widget  --> */}
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionThree />
                      </div>
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionFour />
                      </div>
                      <div className="axil-single-widget widget widget_postlist mb--30">
                        <this.adsPositionFive />
                      </div>
                    </div>
                    {/* <!-- End Sidebar Area  --> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xl-12 d-flex justify-content-center">
                    <this.Pagination />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- End Post List Wrapper  --> */}

            {/* <!-- Start Back To Top  --> */}
            <a id="backto-top"></a>
            {/* <!-- End Back To Top  --> */}
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
