import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';
import './report.css';
import ReactDatetime from 'react-datetime';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';
import Header2 from 'components/Headers/Header2';

const ConfigFile = require('../../config');

const Axios = require('axios').default;
const FileDownload = require('js-file-download');
export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  DownloadReport = async (e) => {
    let type = e.target.name;
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    if (type === 'daily' && this.state.fromText) {
      Axios({
        url: `${ConfigFile.BASE_URL}/orders/reports?fromText=${this.state.fromText}`,
        method: 'GET',
        responseType: 'blob', // Important
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        FileDownload(response.data, `Daily_report_${this.state.fromText}.xlsx`);
      });
    } else if (
      type === 'monthly' &&
      this.state.fromText2 &&
      this.state.toText
    ) {
      Axios({
        url: `${ConfigFile.BASE_URL}/orders/reports?fromText=${this.state.fromText2}&toText=${this.state.toText}`,
        method: 'GET',
        responseType: 'blob', // Important
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        FileDownload(
          response.data,
          `Monthly_report_${this.state.fromText2}.xlsx`
        );
      });
    }
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.valueAsNumber,
    });
    //console.log(this.state);
    console.log(e.target.name, e.target.valueAsNumber);
  };

  ReportCard = () => {
    return (
      <Row>
        <div className=' col'>
          <Card className=' shadow'>
            <CardHeader className=' border-0'>
              <h1>Reports</h1>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg-6>
                  {' '}
                  <div className='mainCard'>
                    <div className='cardTitle'>Daily Reports</div>
                    <div className='cartContent mt-4'>
                      <FormGroup>
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-calendar-grid-58' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='date'
                            placeholder='Select a Date'
                            name='fromText'
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                      </FormGroup>
                    </div>
                    <Button
                      name='daily'
                      disabled={!this.state.fromText}
                      onClick={this.DownloadReport}
                    >
                      Download
                    </Button>
                    <br />
                    {this.state.fromText ? '' : 'Please select a date'}
                  </div>
                </Col>
                <Col lg-6>
                  {' '}
                  <div className='mainCard'>
                    <div className='cardTitle'>Monthly Reports</div>
                    <div className='cartContent mt-4'>
                      <Row>
                        <Col>
                          <FormGroup>
                            <InputGroup className='input-group-alternative'>
                              <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                  <i className='ni ni-calendar-grid-58' />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type='date'
                                placeholder='Select a Date'
                                name='fromText2'
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <InputGroup className='input-group-alternative'>
                              <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                  <i className='ni ni-calendar-grid-58' />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type='date'
                                placeholder='Select a Date'
                                name='toText'
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Button
                      name='monthly'
                      disabled={!this.state.fromText2 && !this.state.toText}
                      onClick={this.DownloadReport}
                    >
                      Download
                    </Button>
                    <br />
                    {this.state.fromText2 && this.state.toText
                      ? ''
                      : 'Please Select a starting date and ending date'}
                  </div>{' '}
                </Col>
              </Row>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </Row>
    );
  };

  render() {
    return (
      <>
        <Header2 />
        <Container className=' mt--7' fluid>
          {/* Table */}
          <this.ReportCard />
        </Container>
      </>
    );
  }
}
