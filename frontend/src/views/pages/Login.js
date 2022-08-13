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

const ConfigFile = require("../../config");

const axios = require("axios").default;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  async login(e) {
    e.preventDefault();

    let response = await axios
      .post(`${ConfigFile.BASE_URL}/auth/signin`, {
        email: this.state.email,
        password: this.state.password,
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Somethig went wrong at server-404 🙁 ",
        });
      });

    console.log(response);
    if (!response) {
      return null;
    }

    if (response.data.statusCode === 200) {
      Cookie.set(ConfigFile.COOKIE_TOKEN, response.data.token);
      Cookie.set(ConfigFile.COOKIE_ADMIN, response.data.data);
      this.setState({
        auth: true,
      });
      console.log("-- Authenticated! --");
    } else if (response.data.statusCode === 404) {
      this.setState({
        error: response.data.msg,
      });
    } else {
      this.setState({
        error: "User does not exist !",
      });
    }

    console.log(this.state.error);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    if (this.state.auth) {
      window.location.reload(false);
      return <Redirect to="dashbord" />;
    }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small> Sign in with credentials</small>
              </div>
              <Form role="form">
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
                      autoComplete="new-email"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      id="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
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
                    onClick={this.login}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            {/* <Col xs="6">
              <a className="text-light" href="#pablo">
                <small>Forgot password ?</small>
              </a>
            </Col> */}
            {/* <Col xs="6"  className="text-right">
              <Link to="/auth/register" variant="body2" className="text-light">
               <small>Sign up here</small> 
              </Link>
            </Col> */}
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
