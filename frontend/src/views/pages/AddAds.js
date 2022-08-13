import React, { Component } from "react";
import Header2 from "../../components/Headers/Header2";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Select from "react-select";

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
} from "reactstrap";
const axios = require("axios").default;
// const URL = require("../ApiUrl");
const ConfigFile = require("../../config");

const style = { color: "red" };
export default class AddAds extends Component {
  state = {
    success: false,
    error: false,
    isRedirect: false,
    selectedOption: null,
    isLoaded: false,
    selectposition: "",
    adsNameList:[],
    selectedFile:null,
    link:"",
    adsname:""
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
    console.log(this.state.selectedFile,"----");
  
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

  componentDidMount() {
    this.GetPositionName();
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
        <Select
          value={selectedOptionType}
          onChange={this.handleChange2}
          options={options}
          name="selectPosition"
          placeholder="Select Preference"
        />
      </>
    );
  };

  setError = () => {
    this.setState({
      nameError: "",
      setPositionError: "",
      linkError: "",
      imageError: "",
    });
  };

  addToItem = async (e) => {
    console.log("started");
     this.setError();
    let isValid = true;

    if (this.state.adsname === "") {
      isValid = false;
      this.setState({
        nameError: "*Title is required",
      });
    }
    if (this.state.selectposition === "") {
      isValid = false;
      this.setState({
        setPositionError: "*Position is required",
      });
    }
    if (this.state.link === "") {
      isValid = false;
      this.setState({
        linkError: "*Link is required",
      });
    }
  
    if (this.state.selectedFile === null) {
      isValid = false;
      this.setState({
        imageError: "*Image is required",
      });
    }
    

    if (!isValid) {
      return;
    } else {
      console.log("formdata start");
      const formData = new FormData();
    
    // Update the formData object
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append(
      "adsname",
      this.state.adsname
    );
    formData.append(
      "link",
      this.state.link
    );
    formData.append(
      "position",
      this.state.selectposition
    );
 
    // Details of the uploaded file
    console.log(this.state.selectedFile);
   
        
      // };
      console.log(formData, "🎁🎁🎁🎁🎁🎁");
      this.PostAds(formData);
    }
  };

  PostAds = async (data) => {

    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let response = await axios
      .post(`${ConfigFile.BASE_URL}/ads/create`, data,config)
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
     console.log(response,"🎈🎈🎈🎈🎈🎈🎈✔");
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/admin/listads" />;
    }
    return (
      <>
        <Header2 />
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Add Ads</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row className="mt-4">
                      <Col md="5">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            placeholder="Name"
                            name="adsname"
                            type="text"
                            onChange={this.handleChange}
                          />
                          <h4 style={style}>{this.state.nameError}</h4>
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup>
                          <label>Set Preference</label>
                          <this.PositionSelect />
                        </FormGroup>
                        <h4 style={style}>{this.state.setPositionError}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>Link</label>
                          <Input
                            placeholder="Ads Link"
                            name="link"
                            type="text"
                            onChange={this.handleChange}
                          />
                          <h4 style={style}>{this.state.linkError}</h4>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label>Image</label>
                          <Input
                            name="selectedFile"
                            type="file"
                            onChange={this.onFileChange}
                          />
                        </FormGroup>
                        <h4 style={style}>{this.state.imageError}</h4>
                      </Col>
                     
                    </Row>
                    <Row className="d-flex justify-content-center mr-md-4 mt-4 ml-5">
                      {" "}
                      <Button
                        color="success"
                        type="button"
                        onClick={this.addToItem}
                      >
                        Submit
                      </Button>
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
  }
}
