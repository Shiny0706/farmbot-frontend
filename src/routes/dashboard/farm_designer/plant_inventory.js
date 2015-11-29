import React from "react";
import { Link } from 'react-router';
import { Plant } from '../../../models/plant'

export class Plants extends React.Component {
  render() {
    return(
      <div className="object-list">
        <label>Current Plants</label>
        <List plants={ this.props.plants.all } />
        <div className="plus-button add-plant button-like" data-toggle="tooltip" title="Add plant" href="/dashboard/designer?left_tab=SpeciesCatalog">
          <i className="fa fa-2x fa-plus" />
        </div>
      </div>
    );
  }
};

export class List extends React.Component {
  render() {
    var mapper = function(plant, key) {
      return(
        <li key={ key } >
          <Link to={ Plant.designerUrl(plant) }> { plant.name } </Link>
          <p>{plant.age} days old</p>
        </li>);
    };

    return(<ul>
             { this.props.plants.map(mapper) }
           </ul>);
  }
};
