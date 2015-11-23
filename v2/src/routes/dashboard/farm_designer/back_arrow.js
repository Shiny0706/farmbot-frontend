import React from 'react';

export class BackArrow extends React.Component {
  render() {
    return( <a href="javascript:history.back()">
              <i className="fa fa-arrow-left"></i>
            </a> );
  }
}
