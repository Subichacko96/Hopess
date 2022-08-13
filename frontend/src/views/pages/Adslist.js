import React, { Component } from "react";
import Header2 from "../../components/Headers/Header2";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Spinner,
  Button,
  CardFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
} from "reactstrap";
import Cookie from "js-cookie";
const axios = require("axios").default;
const ConfigFile = require("../../config");
// const URL = require("../../ApiUrl");
export default class Adslist extends Component {
  state = {
    succsess: false,
    error: false,
    // isRedirect:false,
    isLoaded: false,
    loading: false,
    limit: 20,
    page: 1,
    ads: {},
    hasNextPage: false,
    originalData: [],
  };

  GetAdsList = async (p) => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let page = p ? p : this.state.page;
    let limit = this.state.limit;
    console.log(this.state.page, "--------------");

    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/ads/list/all?page=${page}&limit=${limit}`,
        config
      )
      .catch(function (error) {
        console.log(error);
      });
    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (response && response.data !== null) {
      this.setState({
        ads: response.data.data,
        orginalData: response.data.data,
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
  };
 

  componentDidMount() {
    this.GetAdsList();
  }

  adsList = () => {
    // if (this.state.isLoaded) {
      return (
        <>
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ad Title</th>
              <th scope="col">Position</th>
              <th scope="col">Link</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {this.state.ads &&
            this.state.ads.items.map((data, key) => {
              return (
                <tr>
                  <td>{(this.state.page - 1) * this.state.limit + key + 1}</td>
                  <td>{data.adsname}</td>   
                  <td>{data.position}</td>
                  <td>{data.link}</td>

                  <td>
                  <td>
                    <Link to={`/admin/${data._id}/adsdetail`}>
                      <Button
                        className=" btn-icon m-1"
                        color="info"
                        size="sm"
                        type="button"
                      >
                        <span>
                          <i className="ni ni-single-copy-04 p-1" />
                          View
                        </span>
                      </Button>
                    </Link>
                   
                  </td>
                    {/* <Link>
                      <Button
                        className=" btn-icon m-1"
                        color="danger"
                        size="sm"
                        type="button"
                        onClick={() => this.toggleModal("notificationModal")}
                      >
                        <span>
                          <i className="ni ni-basket p-1" />
                          Delete
                        </span>
                      </Button>
                      <Modal
                        className="modal-dialog-centered modal-danger"
                        contentClassName="bg-gradient-danger"
                        isOpen={this.state.notificationModal}
                        toggle={() => this.toggleModal("notificationModal")}
                      >
                        <div className="modal-header">
                          <h6
                            className="modal-title"
                            id="modal-title-notification"
                          >
                            Your confirmation is required
                          </h6>
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() =>
                              this.toggleModal("notificationModal")
                            }
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="py-3 text-center">
                            <i class="ni ni-basket ni-3x"></i>
                            <h4 className="heading mt-4">ATTENTION !!</h4>
                            <p>Are you sure want to delete this Ads ?</p>
                            <p>You can't undo this operation!</p>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={(e) => this.DeleteAds()}
                          >
                            Ok, Delete
                          </Button>
                          <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() =>
                              this.toggleModal("notificationModal")
                            }
                          >
                            Close
                          </Button>
                        </div>
                      </Modal>
                    </Link> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
        </>
      );
   
  };


  Pagination = () => {
    let totalPages = this.state.ads ? this.state.ads.totalPages : 0;
    let currentPage = this.state.page;
    console.log(currentPage, "🎄🎄🎄🎄🎄🎄");
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
                    <PaginationLink onClick={(e) => e.preventDefault()}>
                      {key + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem>
                    <PaginationLink
                      onClick={(type) => {
                        this.setState({ page: key + 1 });
                        this.GetAdsList(key + 1);
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
  DeleteAds = async (id) => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let adsId = id;
    console.log(id, "🛒🛒🧶");

    let response = await axios
      .delete(`${ConfigFile.BASE_URL}/ads/${adsId}/delete`, config)
      .catch(function (error) {
        console.log(error);
      });
    if (response && response.data.statusCode === 200) {
      this.setState({
        isRedirect: true,
        errorCode: response.data.msg,
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

    console.log(response);
    window.location.reload(true);
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };


  render() {
    if (this.state.isLoaded) {
    return (
      <>
        <Header2 />
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Ads List</h3>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <this.adsList />
                </Table>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  } else {
    return null;
  }
  }
}
