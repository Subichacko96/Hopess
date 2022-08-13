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
  CardImg,
  CardTitle,
  Modal
} from "reactstrap";
const axios = require("axios").default;
// const URL = require("../ApiUrl");
const ConfigFile = require("../../config");

const style = { color: "red" };
export default class AdsDetail extends Component {
  state = {
    success: false,
    error: false,
    isRedirect: false,
    selectedOption: null,
    isLoaded: false,
    selectposition: "",
    adsNameList: [],
    selectedFile: null,
    link: "",
    adsname: "",
  };

  handleChange = async (e) => {
    console.log(e.target.value);
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onFileChange = (e) => {
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
    console.log(this.state.selectedFile, "----");
  };

  GetPositionName = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/ads/list/position`, config)
      .catch(function (error) {
        console.log(error);
      });
    console.log("👇👇👇👇👇👇👇👇👇👇");
    console.log(response);
    if (response && response.data !== null) {
      this.setState({
        adsNameList: response.data.data,
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

  GetAdsDetails = async () => {
    let id = this.props.match.params.id;
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios
      .get(`${ConfigFile.BASE_URL}/ads/${id}/single`, config)
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
    console.log(this.state.ads, "hai");
  };

  componentDidMount() {
    this.GetPositionName();
    this.GetAdsDetails();
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

  PositionSelect = () => {
    let selectedposition = this.state.ads;
    const { selectedOptionType } = this.state;
    let options = [];
    this.state.adsNameList.map((item) =>
      options.push({
        // value: item._id,
        value: item.position,
        label: `${item.position}`,
      })
    );
    return (
      <>
        {/* <CustomInput
          id="mainInput3"
          type="select"
          value={selectedOptionType}
          onChange={this.handleChange2}
          options={options}
          name="selectposition"
        >
          <option>Select</option>
          <option value="No Preference">No Preference</option>
         
        </CustomInput> */}
        <CustomInput
          id="mainInput3"
          type="select"
          //   value={selectedOptionType}
          onChange={this.handleChange}
          //   options={options}
          name="selectposition"
        >
          <option value="">{selectedposition.position}</option>
          {this.state.adsNameList.map((data, key) => {
            return <option value={data.position}>{data.position}</option>;
          })}
        </CustomInput>
      </>
    );
  };



  
  DeleteAds = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let id = this.props.match.params.id;
    console.log(id, "🛒🛒🧶");

    let response = await axios
      .delete(`${ConfigFile.BASE_URL}/ads/${id}/delete`, config)
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

  EditAdsDetails = async (e) => {
    console.log("start editing");
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let id = this.props.match.params.id;
    const formData = new FormData();

    if (this.state.adsname) {
      formData.append("adsname", this.state.adsname);
    }
    if (this.state.selectposition) {
      formData.append("position", this.state.selectposition);
    }
  
    if (this.state.selectedFile) {
      formData.append(
        "image",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    
    if (this.state.link) {
      formData.append("link", this.state.link);
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

    console.log(formData, "this is form data");

    let response = await axios
      .patch(`${ConfigFile.BASE_URL}/ads/${id}/update`, formData, config)
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
      return <Redirect to="/admin/listads" />;
    }
    if (this.state.isLoaded) {
        let details = this.state.ads;
      return (
        <>
          <Header2 />
          <Container className=" mt--7" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Ads Details</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row className="mt-4">
                        <Col md="6">
                          <FormGroup>
                            <label>Title</label>
                            <Input
                              placeholder="Name"
                              name="adsname"
                              type="text"
                              onChange={this.handleChange} defaultValue={details.adsname}
                            />
                            {/* <h4 style={style}>{this.state.nameError}</h4> */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Set Preference</label>
                            <this.PositionSelect />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Link</label>
                            <Input
                              placeholder="Ads Link"
                              name="link"
                              type="text"
                              onChange={this.handleChange} defaultValue={details.link}
                            />
                            {/* <h4 style={style}>{this.state.nameError}</h4> */}
                          </FormGroup>
                        </Col>
                        <Card className="d-flex justify-item-right ml-3" style={{ float:"right", width: "25rem"}} >
                        <CardImg
                          alt="..."
                          src={`${ConfigFile.BASE_URL}/uploads/${details.image}`} height="150px"
                          top
                        />
                        
                        <CardBody>
                        <CardTitle>Change Image</CardTitle>
                        <Input
                            name="selectedFile"
                            type="file" 
                            onChange={this.onFileChange} 
                          />
                        </CardBody>
                      </Card>

                      </Row>
                      <Row className="d-flex justify-content-center mr-md-4 mt-4 ml-5">
                        {" "}
                        <Button
                          color="success"
                          type="button"
                          onClick={() => this.EditAdsDetails()}
                        >
                          Save Changes
                        </Button>
                        <Link>
                      <Button
                        className=" btn-icon"
                        color="danger"
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
                            <i className="ni ni-basket ni-3x"></i>
                            <h4 className="heading mt-4">ATTENTION !!</h4>
                            <p>Are you sure want to delete this Ads ?</p>
                            <p>You can't undo this operation!  </p>
                          </div>
                          
                        </div>
                        <div className="modal-footer">
                          <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={() => this.DeleteAds()}
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
