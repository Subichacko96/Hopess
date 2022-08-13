import React, { Component } from "react";
import Header2 from "../../components/Headers/Header2";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  FormGroup,
  Form,
  Input,
  CustomInput,
  Button,
  UncontrolledAlert,
  CardImg,
  CardTitle,
  CardText,
  Modal,
} from "reactstrap";
const axios = require("axios").default;
const URL = require("../ApiUrl");
const ConfigFile = require("../../config");

const style = { color: "red" };
export default class NewsDetail extends Component {
  state = {
    success: false,
    error: false,
    isRedirect: false,
    isLoaded: false,
    selectedOption: null,
    selectcategory: "",
    selectposition: "",
    selectlocation: "",
    name: "",
    date: "",
    // image: "",
    content: "",
    newsNameList: [],
    //imageId: "",
    news: "",
    selectedFiles: [],
  };

  handleChange = async (e) => {
    console.log(e.target.value);
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onFileChange = (e) => {
    console.log(e.target.files);
    this.setState({ selectedFiles: e.target.files});
    // [...this.state.files, ...e.target.files]
    console.log(this.state.selectedFiles, "----");
  };

  GetPositionName = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/news/list`, config)
      .catch(function (error) {
        console.log(error);
      });
    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (response && response.data !== null) {
      this.setState({
        newsNameList: response.data.data,
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
    console.log(response, "🎇");
  };
  GetNewsDetails = async () => {
    let id = this.props.match.params.id;
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/news/single/${id}`, config)
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
    console.log(this.state.news, "hai");
  };

  componentDidMount() {
    this.GetPositionName();
    this.GetNewsDetails();
  }

  handleChange2 = async (selectedOptionType) => {
    this.setState({ selectedOptionType });
    console.log(`Option selected:`, selectedOptionType);
    console.log(selectedOptionType.value);
    // console.log(selectedOptionType.value2);
    // console.log(selectedOptionType.name1,"👑")
    await this.setState({
      selectposition: selectedOptionType.value,
    });
    // this.GetProducts();
  };

  CategorySelect = () => {
    let category = this.state.news;
    return (
      <>
        <CustomInput
          id="mainInput1"
          type="select"
          onChange={this.handleChange}
          name="selectcategory"
        >
          <option value="">{category.category}</option>
          <option value="business">Business</option>
          <option value="film">Film</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="Social Media Stars">Social Media Stars </option>
          <option value="sports">Sports</option>
          

        </CustomInput>
      </>
    );
  };
  LocationSelect = () => {
    let location = this.state.news;
    return (
      <>
        <CustomInput
          id="mainInput2"
          type="select"
          onChange={this.handleChange}
          name="selectlocation"
        >
          <option value="">{location.location}</option>;
          <option value="UK">UK</option>
          <option value="India">INDIA</option>
          <option value="UAE">UAE</option>
          {/* {this.state.cityData &&
                      this.state.cityData.map((data, key) => {
                        return <option value={data.id}>{data.name}</option>;
                      })} */}
          {/* <option>Select</option>
           */}
        </CustomInput>
      </>
    );
  };
  PositionSelect = () => {
    let selectedposition = this.state.news;
    const { selectedOptionType } = this.state;
    let preference = [{ value: "No Preference", label: "No Preference" }];
    let options = preference;
    this.state.newsNameList.map((item) =>
      options.push({
        // value: item._id,
        value: item.position,
        label: `${item.position}`,
      })
    );

    return (
      <>
        <CustomInput
          id="mainInput3"
          type="select"
          //   value={selectedOptionType}
          onChange={this.handleChange}
          //   options={options}
          name="selectposition"
        >
          <option value="">{selectedposition.position}</option>
          <option value="No Preference">No Preference</option>
          {this.state.newsNameList.map((data, key) => {
            return <option value={data.position}>{data.position}</option>;
          })}
        </CustomInput>
        {/* <Select 
          value={selectedOptionType}
          onChange={this.handleChange2}
          options={options}
          name="selectPosition" 
        /> */}
      </>
    );
  };

  DeleteNews = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let id = this.props.match.params.id;
    console.log(id, "🛒🛒🧶");

    let response = await axios
      .delete(`${ConfigFile.BASE_URL}/news/${id}/delete`, config)
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
    // window.location.reload(true);
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  EditNewsDetails = async (e) => {
    console.log("start editing");
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let id = this.props.match.params.id;
    const formData = new FormData();

    if (this.state.name) {
      formData.append("name", this.state.name);
    }
    if (this.state.content) {
      formData.append("content", this.state.content);
    }
    if (this.state.date) {
      formData.append("date", Date.parse(new Date(this.state.date).toString()));
    }
    if (this.state.selectedFiles && this.state.selectedFiles.length>0) {
      console.log(this.state.selectedFiles,"🍬🍬🍬🍫🍫")
      for (const file of this.state.selectedFiles) {
        formData.append(
          "image",
          file,
          file.name
        );
      }
    }
    
    if (this.state.selectposition) {
      formData.append("position", this.state.selectposition);
    }
    if (this.state.selectcategory) {
      formData.append("category", this.state.selectcategory);
    }
    if (this.state.selectlocation) {
      formData.append("location", this.state.selectlocation);
    }

    // else{
    //    let data= {
    //     name: this.state.name,
    //     content: this.state.content,
    //     date: Date.parse(new Date(this.state.date).toString()),
    //     position: this.state.selectposition,
    //     category: this.state.selectcategory,
    //     location: this.state.selectlocation,
    //   };

    // }

    console.log(...formData, "this is form data");

    let response = await axios
      .patch(`${ConfigFile.BASE_URL}/news/${id}/update`, formData, config)
      .catch(function (error) {
        console.log(error);
      });
    console.log(response, "🎈🎈🎈🎈🎈🎈🎈✔");

    if (response && response.data.statusCode === 200) {
      this.setState({
        success: true,
        isRedirect: true,
      });
    } else if (response && response.data.statusCode !== 200) {
      this.setState({
        error: true,
        errorCode: response.data.msg,
      });
    } else {
      this.setState({
        error: true,
      });
    }
    console.log(response, "🎈🎈🎈🎈🎈🎈🎈✔");
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/admin/listnews" />;
    }
    if (this.state.isLoaded) {
      let details = this.state.news;
      console.log(details, "list details");
      let fromdate = details.date;

      const startdate = (fromdate) => fromdate.toISOString().slice(0, 10);
      const today = startdate(new Date(fromdate));

      return (
        <>
          <Header2 />
          <Container className=" mt--7" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">News Details</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="5">
                          <FormGroup>
                            <label>Heading</label>
                            <Input
                              placeholder="Name"
                              name="name"
                              type="text"
                              onChange={this.handleChange}
                              defaultValue={details.name}
                            />
                            {/* <h4 style={style}>{this.state.nameError}</h4> */}
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <label>Date</label>
                            <Input
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                              defaultValue={today}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Category</label>
                            <this.CategorySelect />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Location</label>
                            <this.LocationSelect />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Set Preference</label>
                            <this.PositionSelect />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <label>Content</label>
                            <Input
                              placeholder=" Content ..."
                              rows="6"
                              name="content"
                              type="textarea"
                              onChange={this.handleChange}
                              defaultValue={details.content}
                            />
                          </FormGroup>
                        </Col>
                        <Card
                          className="d-flex justify-item-right ml-3"
                          style={{ float: "right", width: "18rem" }}
                        >
                          <CardImg
                            alt="..."
                            src={`${ConfigFile.BASE_URL}/uploads/${details.image[0]}`}
                            height="150px"
                            top
                          />

                          <CardBody>
                            <CardTitle>Change Image</CardTitle>
                            <Input
                              name="selectedFiles"
                              type="file" multiple
                              onChange={this.onFileChange}
                            />
                          </CardBody>
                        </Card>
                      </Row>
                      <Row className="d-flex justify-content-center mr-md-4 mt-4">
                        {" "}
                        <Button
                          className=" btn-icon"
                          color="primary"
                          type="button"
                          onClick={() => this.EditNewsDetails()}
                        >
                          Save Changes
                        </Button>
                        <Link>
                          <Button
                            className=" btn-icon"
                            color="danger"
                            type="button"
                            onClick={() =>
                              this.toggleModal("notificationModal")
                            }
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
                                <i className="ni ni-basket ni-3x"></i>
                                <h4 className="heading mt-4">ATTENTION !!</h4>
                                <p>Are you sure want to delete this News ?</p>
                                <p>You can't undo this operation! </p>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <Button
                                className="btn-white"
                                color="default"
                                type="button"
                                onClick={() => this.DeleteNews()}
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
                        </Link>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Row>
              {/* <this.Alert/> */}
          </Container>
        </>
      );
    } else {
      return null;
    }
  }
}
