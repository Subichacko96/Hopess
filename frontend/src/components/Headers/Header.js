import React from "react";
import Cookie from "js-cookie";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
const ConfigFile = require("../../config");

const axios = require("axios").default;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outOfStocks: [],
      statistics: null,
    };
  }

  getData = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;

    const userData = Cookie.get(ConfigFile.COOKIE_ADMIN)
      ? JSON.parse(Cookie.get(ConfigFile.COOKIE_ADMIN))
      : null;

    let response = await axios({
      method: "get",
      url: `${ConfigFile.BASE_URL}/statistics/basics`,

      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response);
    if (response.data.statusCode === 200) {
      this.setState({
        statistics: response.data.data,
        isLoaded: true,
      });
    }
    console.log("🚀✨✅✨✨✨🚀💜❌");

    console.log(this.state.statistics);
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <>
          <div
            className="header  pb-8 pt-5 pt-md-8"
            style={{
              background:
                "linear-gradient(90deg, rgba(45,206,143,1) 0%, rgba(45,206,200,1) 100%)",
            }}
          >
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                <Row>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Sales
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.state.statistics
                                ? this.state.statistics.monthlyCount
                                : 0}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">Monthly</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Customers
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.state.statistics
                                ? this.state.statistics.customerCount
                                : 0}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="fas fa-users" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">Monthly</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Sales
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.state.statistics
                                ? this.state.statistics.dailyOrder
                                : 0}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap"> Daily</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Out of Stocks
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.state.statistics
                                ? this.state.statistics.outOffStockCount
                                : 0}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i className="fas fa-percent" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">&nbsp;</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Header;
