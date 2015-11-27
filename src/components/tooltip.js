import React from "react";
import { Link } from 'react-router';

export class ToolTip extends React.Component {
  render() {
    return(
      <div>
        <div className="fb-tooltip">
          <div className="tooltip-text">
            { this.props.desc }
          </div>
        </div>
        <Link to={ this.props.href }>
          <span className={ (this.props.color || "") + " plus-circle" }>
          </span>
        </Link>
      </div>
    );
  }
};
