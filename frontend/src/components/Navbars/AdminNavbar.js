import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import Cookie from 'js-cookie';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';

const ConfigFile = require('../../config');

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    const userData = Cookie.get(ConfigFile.COOKIE_ADMIN)
      ? Cookie.get(ConfigFile.COOKIE_ADMIN)
      : null;
    this.setState({
      user: JSON.parse(userData),
    });
    //console.log( this.state.user);
    //console.log(token);
  }
  render() {
    return (
      <>
        <Navbar className='navbar-top navbar-dark' expand='md' id='navbar-main'>
          <Container fluid>
            <Link
              className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'
              to='/'
            >
              {this.props.brandText}
            </Link>

            <Nav className='align-items-center d-none d-md-flex' navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className='pr-0' nav>
                  <Media className='align-items-center'>
                    <span className='avatar avatar-sm rounded-circle'>
                      <img
                        className='user-avatar rounded-circle'
                        src='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100'
                        alt='User Avatar'
                      />
                    </span>
                    <Media className='ml-2 d-none d-lg-block'>
                      <span className='mb-0 text-sm font-weight-bold'>
                        {this.state.user.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-arrow' right>
                  <a href='/admin/profile'>
                    <DropdownItem className='text-primary'>
                      <i className='ni ni-circle-08'>&#xE879;</i>
                      Profile
                    </DropdownItem>
                  </a>
                  <DropdownItem divider />
                  <Logout />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
