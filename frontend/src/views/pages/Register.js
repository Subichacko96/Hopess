import React from "react";
import Cookie from "js-cookie";
import { Link, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
const style = {
  color: "red",
};
const ConfigFile = require("../../config");

const axios = require("axios").default;

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    mobile: "",
    name: "",
    confirmpassword: "",
  };

  resetErrorMsg = () => {
    this.setState({
      nameError: "",
      emailError: "",
      mobileError: "",
      passwordError: "",
      confirmpasswordError: "",
    });
  };

  AddToItems = (e) => {
    this.resetErrorMsg();
    let isValid = true;
    if (this.state.name === "") {
      isValid = false;
      this.setState({
        nameError: "*Name is required",
      });
      console.log(this.state.name, "Name error");
    }
    if (this.state.email === "") {
      isValid = false;
      this.setState({
        emailError: "*Email is required",
      });
      console.log(this.state.email, "email error");
    }
    if (this.state.mobile === "") {
      isValid = false;
      this.setState({
        mobileError: "*Mobile Number is required",
      });
      console.log(this.state.mobile, "mobile error");
    }
    if (this.state.password === "") {
      isValid = false;
      this.setState({
        passwordError: "*Password is required",
      });
      console.log(this.state.password, "password error");
    }
    if (this.state.confirmpassword === "") {
      isValid = false;
      this.setState({
        confirmpasswordError: "*Password is required",
      });
      console.log(this.state.confirmpassword, "confirmpassword error");
      
    }
    if (this.state.confirmpassword !== this.state.password) {
      isValid = false;
      this.setState({
        confirmpasswordError: "*Password is not match",
      });
      console.log(this.state.confirmpassword, "confirmpassword match error");
    }

    if (!isValid) {
      return;
    } else {
      var obj = {
        email: this.state.email,
        password: this.state.password,
        mobile: this.state.mobile,
        name: this.state.name,
      };
      console.log(obj, "🎁🎁🎁🎁🎁🎁");
      this.siginin(obj);
    }
  };

  siginin = async (data) => {
    let response = await axios.post(`${ConfigFile.BASE_URL}/auth/signup`, data);
    console.log(response);
    if (response.data.statusCode === 200) {
      this.setState({
        succsess: true,
        isRedirect: true,
      });
      console.log(this.state.isRedirect);
    }
    if (response.data.statusCode !== 200) {
      this.setState({
        error : response.data.msg
      });
      console.log(this.state.error);
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    if (this.state.isRedirect) {
      window.location.reload(false);
      return <Redirect to="/admin/products" />;
    }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small> Sign Up For New User</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name"
                      type="text"
                      id="email"
                      name="name"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <h4 style={style}>{this.state.nameError}</h4>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <h4 style={style}>{this.state.emailError}</h4>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Mobile Number"
                      name="mobile"
                      type="number"
                      id="phone"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <h4 style={style}>{this.state.mobileError}</h4>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <h4 style={style}>{this.state.passwordError}</h4>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <h4 style={style}>{this.state.confirmpasswordError}</h4>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />

                  <h4 className="text-center text-muted mb-4">
                    {this.state.error}
                  </h4>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={this.AddToItems}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link to="/auth/login" variant="body2" className="text-light">
                <small>Login Here</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Register;
