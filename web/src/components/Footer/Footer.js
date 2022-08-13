import React, { Component } from "react";
import mainLogo from'../../assets/images/hopeslogo.png';

class Footer extends React.Component {
  render() {
    return (
    
         <div className="axil-footer-area axil-footer-style-1 bg-color-white">
            {/* <!-- Start Footer Top Area  --> */}
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    {/* <!-- Start Post List  --> */}
                    <div className="inner d-flex align-items-center flex-wrap">
                      <h5 className="follow-title mb--0 mr--20">Follow Us</h5>
                      <ul className="social-icon color-tertiary md-size justify-content-start">
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
                          <i class="fab fa-youtube"></i>
                          </a>
                        </li>
                      
                      </ul>
                    </div>
                    {/* <!-- End Post List  --> */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* <!-- End Footer Top Area  -->
              
            <!-- Start Copyright Area  --> */}
            <div className="copyright-area">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-9 col-md-12">
                    <div className="copyright-left">
                      <div className="logo">
                        <a href="index.html">
                          <img
                            className="dark-logo"
                            src={mainLogo}
                            alt="Logo Images"
                          />
                          <img
                            className="light-logo"
                            src={mainLogo}
                            alt="Logo Images"
                          />
                        </a>
                      </div>
                      <ul className="mainmenu justify-content-start">
                      {/* <li>
                          <a className="hover-flip-item-wrapper" href="/">
                            <span className="hover-flip-item">
                              <span data-text="Home">Home</span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="hover-flip-item-wrapper" href="/blog">
                            <span className="hover-flip-item">
                              <span data-text="Category">Category</span>
                            </span>
                          </a>
                        </li> */}
                        {/* <li>
                          <a className="hover-flip-item-wrapper" href="#">
                            <span className="hover-flip-item">
                              <span data-text="Phone">Phone</span>
                            </span>
                          </a>
                        </li> */}
                        <li>
                          <a className="hover-flip-item-wrapper" href="#">
                            <span className="hover-flip-item">
                              <span data-text="mystory.hopesclub@gmail.com">mystory.hopesclub@gmail.com</span>
                            </span>
                          </a>
                        </li>
                        
                       
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="copyright-right text-start text-lg-end mt_md--20 mt_sm--20">
                      <p className="b3">All Rights Reserved © 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Copyright Area  --> */}
           
          </div>
      
    );
  }
}

export default Footer;
