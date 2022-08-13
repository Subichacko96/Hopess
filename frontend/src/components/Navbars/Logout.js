import React from 'react';

import { DropdownItem } from 'reactstrap';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href='/admin/logout'>
          <DropdownItem className='text-danger'>
            <i className='ni ni-user-run'>&#xE879;</i>
            Logout
          </DropdownItem>
        </a>
      </div>
    );
  }
}
