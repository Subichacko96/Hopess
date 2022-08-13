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
  UncontrolledAlert,
  Button

} from "reactstrap";
const axios = require("axios").default;
const URL = require("../ApiUrl");
const ConfigFile = require("../../config");


const style = { color: "red" };
export default class AddNews extends Component {
  state = {
    success: false,
    error: false,
    isRedirect: false,
    isLoaded:false,
    selectedOption: null,
    selectcategory: "",
    selectposition: "",
    selectlocation: "",
    name: "",
    date: "",
    image: [],
    content: "",
    newsNameList: [],
    // imageId:"",
    selectedFiles:[]
  };

  handleChange = async (e) => {
    //console.log(e.target.value);
     await this.setState({
       [e.target.name]: e.target.value,
     });
     console.log(this.state)
     
   };
   onFileChange = (e) => {
    console.log(e.target.files);
    this.setState({ selectedFiles: e.target.files});
    console.log(this.state.selectedFiles,"----");
  
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
  


  CategorySelect = () => {
    return (
      <>
        <CustomInput
          id="mainInput1"
          type="select"
          onChange={this.handleChange}
          name="selectcategory"
        >
          <option>Select</option>
          <option value="business">Business</option>
          <option value="film">Film</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="Social Media Stars">Social Media Stars</option>
          <option value="sports">Sports</option>
        </CustomInput>
      </>
    );
  };
  LocationSelect = () => {
    return (
      <>
        <CustomInput
          id="mainInput2"
          type="select"
          onChange={this.handleChange}
          name="selectlocation"
        >
          <option>Select</option>
          <option value="UK">UK</option>
          <option value="India">INDIA</option>
          <option value="UAE">UAE</option>
        </CustomInput>
      </>
    );
  };
  PositionSelect = () => {
    const { selectedOptionType } = this.state;
    let preference=[{value:'No Preference',label:'No Preference'}]
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
      dateError: "",
      setPositionError: "",
      setCategoryError: "",
      setLocationError: "",
      imageError: "",
      contentError: "",
    });
  };

  addToItem = async (e) => {
    console.log("started");
     this.setError();
    let isValid = true;

    if (this.state.name === "") {
      isValid = false;
      this.setState({
        nameError: "*Name is required",
      });
    }
    if (this.state.date === "") {
      isValid = false;
      this.setState({
        dateError: "*Date is required",
      });
    }
    if (this.state.selectposition === "") {
      isValid = false;
      this.setState({
        setPositionError: "*Position is required",
      });
    }
    if (this.state.selectcategory === "") {
      isValid = false;
      this.setState({
        setCategoryError: "*Category is required",
      });
    }
    if (this.state.selectedFiles===null || this.state.selectedFiles.length===0) {
      isValid = false;
      this.setState({
        imageError: "*Image is required",
      });
    }
    if (this.state.selectlocation === "") {
      isValid = false;
      this.setState({
        setLocationError: "*Location is required",
      });
    }
    if (this.state.content === "") {
      isValid = false;
      this.setState({
        contentError: "*Content is required",
      });
    }
    

    if (!isValid) {
      return;
    } else {
      console.log("formdata start");
      const formData = new FormData();
    
    for (const file of this.state.selectedFiles) {

      formData.append(
        "image",
        file,
        file.name
      );
    }
    // Update the formData object
   
    formData.append(
      "name",
      this.state.name
    );
    formData.append(
      "date",
      Date.parse(new Date(this.state.date).toString())
    );
    formData.append(
      "position",
      this.state.selectposition
    );
    formData.append(
      "category",
      this.state.selectcategory
    );
    formData.append(
      "location",
      this.state.selectlocation
    );
    formData.append(
      "content",
      this.state.content
    );
    
    
    
    
  
    // Details of the uploaded file
   // console.log(this.state.selectedFile);
     
      console.log(formData, "🎁🎁🎁🎁🎁🎁");

      this.PostNews(formData);
    }
  };
  
  PostNews = async (data) => {

    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let response = await axios
      .post(`${ConfigFile.BASE_URL}/news/create`, data,config)
      .catch(function (error) {
        console.log(error);
      });
     console.log(response, "🎈🎈🎈🎈🎈🎈🎈✔");
     console.log(`${ConfigFile.BASE_URL}/news/create`, "🎈🎈");

    if (response && response.data.statusCode === 200) {
      this.setState({
        success: true,
        isRedirect: true,
      });
      console.log(this.state,  "🎈🎈🎈🎈🎈✔");
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
  Alert = () => {
    if (this.state.success) {
      return (
        <UncontrolledAlert color="success" fade={false} className="mt-3">
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>{" "}
          <span className="alert-inner--text">
            <strong>Success!</strong> News Added Successfully
          </span>
        </UncontrolledAlert>
      );
    } else if (this.state.error) {
      return (
        <UncontrolledAlert color="danger" fade={false} className="mt-3">
          <span className="alert-inner--icon"></span>{" "}
          <span className="alert-inner--text">
            <strong>{this.state.errorCode}</strong>
          </span>
        </UncontrolledAlert>
      );
    } else {
      return <></>;
    }
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/admin/listnews" />;
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
                  <h3 className=" mb-0">Add News</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row className="mt-4">
                      <Col md="5">
                        <FormGroup>
                          <label>Heading</label>
                          <Input
                            placeholder="Name"
                            name="name"
                            type="text"
                            onChange={this.handleChange}
                          />
                          <h4 style={style}>{this.state.nameError}</h4>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Date</label>
                          <Input
                            type="date"
                            name="date"
                            onChange={this.handleChange}
                          />
                           <h4 style={style}>{this.state.dateError}</h4>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Set Preference</label>
                          <this.PositionSelect />
                          <h4 style={style}>{this.state.setPositionError}</h4>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Category</label>
                          <this.CategorySelect />
                          <h4 style={style}>{this.state.setCategoryError}</h4>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Location</label>
                          <this.LocationSelect />
                          <h4 style={style}>{this.state.setLocationError}</h4>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Image</label>
                          <Input
                            name="selectedFiles"
                            type="file"
                            multiple onChange={this.onFileChange}
                          />
                           <h4 style={style}>{this.state.imageError}</h4>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="9">
                        <FormGroup>
                          <label>Content</label>
                          <Input
                            placeholder=" Content ..."
                            rows="6"
                            name="content"
                            type="textarea"
                            onChange={this.handleChange}
                          />
                           <h4 style={style}>{this.state.contentError}</h4>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mr-md-4 mt-4">
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
