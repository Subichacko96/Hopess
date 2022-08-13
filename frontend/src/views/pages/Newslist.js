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
export default class Newslist extends Component {
  state = {
    succsess: false,
    error: false,
    // isRedirect:false,
    isLoaded: false,
    loading: false,
    limit: 10,
    page: 1,
    news: {},
    hasNextPage: false,
    originalData: [],
    defaultModal: false,
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

    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/news/list/all?page=${page}&limit=${limit}`,
        config
      )
      .catch(function (error) {
        console.log(error);
      });
    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (response && response.data !== null) {
      this.setState({
        news: response.data.data,
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
    this.GetNewsList();
  }

  newsList = () => {
    // if (this.state.isLoaded) {
    return (
      <>
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Content</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.news &&
            this.state.news.items.map((data, key) => {
              return (
                <tr>
                  <td>{(this.state.page - 1) * this.state.limit + key + 1}</td>
                  <td >{data.name.substring(0, 35)}...</td>
                  <td> {new Date(data.date).toLocaleDateString("es-CL")}</td>
                  <td>{data.content.substring(0, 40)}...</td>
                  <td>{data.category}</td>

                  <td>
                    <Link to={`/admin/${data._id}/newsdetail`}>
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
                </tr>
              );
            })}
        </tbody>
       
      </>
    );
  };

  Pagination = () => {
    let totalPages = this.state.news ? this.state.news.totalPages : 0;
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
                        this.GetNewsList(key + 1);
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
                    <h3 className=" mb-0">News List</h3>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <this.newsList />
                  
                  </Table>
                  <CardFooter>
                    {" "}
                    <this.Pagination />

                  </CardFooter>
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
