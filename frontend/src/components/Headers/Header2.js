import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

class Header2 extends React.Component {
  render() {
    return (
      <>
        <div className="header  pb-8 pt-5 pt-md-8"
            style={{
              background:
                "linear-gradient(90deg, rgba(45,206,143,1) 0%, rgba(45,206,200,1) 100%)",
            }}>
          <Container fluid>
            <div className='header-body'></div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header2;
