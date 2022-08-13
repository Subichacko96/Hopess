import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { NavbarBrand, Navbar, Container } from 'reactstrap';
const ConfigFile = require('../../config');

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className='navbar-top navbar-horizontal navbar-dark'
          expand='md'
        >
          <Container className='px-4 '>
            <NavbarBrand to='/' tag={Link}>
              <h1 style={{ color: '#fff' }}>{ConfigFile.STORE_NAME}</h1>
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
