import React from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import Cookie from 'js-cookie';
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from 'variables/charts.js';

import Header from 'components/Headers/Header.js';
import Header2 from 'components/Headers/Header2';
const ConfigFile = require('../config');

const axios = require('axios').default;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      succsess: false,
      error: false,
      // isRedirect:false,
      isLoaded: false,
      loading: false,
      limit: 20,
      page: 1,
      news: {},
      hasNextPage: false,
      originalData: [],
      defaultModal: false,
     
    };
   
  }
  
  GetNewsList = async () => {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
   

    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/news/list/today`,
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

  newsTable = () => {
    


    let buttonCss = {
      backgroundColor: 'rgba(193,251,255,0)',
      border: '0px',
      marginLeft: '5px',
    };

    return (
      <Col lg='12'>
        <Card className=' shadow'>
          <CardHeader className=' border-0'>
            <h2>Recently Added News</h2>
            
          </CardHeader>
          <CardBody>
            <Table className='align-items-center table-flush' responsive>
            <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
           
            <th scope="col">Category</th>
          </tr>
        </thead>
              <tbody>
          {this.state.news &&
            this.state.news.items.map((data, key) => {
              return (
                <tr>
                  <td>{(this.state.page - 1) * this.state.limit + key + 1}</td>
                  <td>{data.name}</td>
                  <td> {new Date(data.date).toLocaleDateString("es-CL")}</td>
                  
                  <td>{data.category}</td>

                  
                </tr>
              );
            })}
            
        </tbody>
 
            </Table><div className="d-flex justify-content-center">
            <Link to={`/admin/listnews`} >
                      <Button
                        className=" btn-icon m-1"
                        color="info"
                        size="sm"
                        type="button"
                      >
                        <span>
                          <i className="ni ni-single-copy-04 p-1" />
                          View All
                        </span>
                      </Button>
                    </Link></div>
          </CardBody>
        </Card>
      </Col>
    );
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <>
        
          <Header2/>
          {/* Page content */}
          <Container className='mt--7' fluid>
            <Row className='mt-5'>
              <this.newsTable />
            </Row>
          </Container>
        </>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Index;
