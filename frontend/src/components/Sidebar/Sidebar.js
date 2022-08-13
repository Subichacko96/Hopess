import React from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';
import Logout from '../Navbars/Logout';

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.visible) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName='active'
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      } else {
        return <></>;
      }
    });
  };
  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: '_blank',
      };
    }
    return (
      <Navbar
        className='navbar-vertical fixed-left navbar-light bg-white'
        expand='md'
        id='sidenav-main'
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className='navbar-toggler'
            type='button'
            onClick={this.toggleCollapse}
          >
            <span className='navbar-toggler-icon' />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className='pt-4' {...navbarBrandProps}>
              <img
                alt='...'
                src={require('assets/img/brand/white.png')}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className='align-items-center d-md-none'>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className='align-items-center'>
                  <span className='avatar avatar-sm rounded-circle'>
                    <img
                      className='user-avatar rounded-circle'
                      src='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100'
                      alt='User Avatar'
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow' right>
                <DropdownItem className='noti-title' header tag='div'>
                  <h6 className='text-overflow m-0'>Welcome!</h6>
                </DropdownItem>
                <DropdownItem to='/admin/user-profile' tag={Link}>
                  <i className='ni ni-settings-gear-65' />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to='/admin/user-profile' tag={Link}>
                  <i className='ni ni-calendar-grid-58' />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to='/admin/user-profile' tag={Link}>
                  <i className='ni ni-support-16' />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <Logout />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className='navbar-collapse-header d-md-none'>
              <Row>
                {logo ? (
                  <Col className='collapse-brand' xs='6'>
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img
                          alt='...'
                          src={require('assets/img/brand/white.png')}
                        />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img
                          alt='...'
                          src={require('assets/img/brand/white.png')}
                        />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className='collapse-close' xs='6'>
                  <button
                    className='navbar-toggler'
                    type='button'
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}

            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>

            {/* Divider 
            <hr className="my-3" />
            {/* Heading */}

            {/* Navigation 
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink>
                  <i className="ni ni-spaceship" />
                  Getting started
                </NavLink>
              </NavItem>
            </Nav>
            */}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
