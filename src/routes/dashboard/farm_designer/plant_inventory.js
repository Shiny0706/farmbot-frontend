import React from "react";
import { Link } from 'react-router';
import { Plant } from '../../../models/plant'

export class Plants extends React.Component {
  render() {
    return(
      <div className="panel-container green-panel">
        <div className="panel-header green-panel">
          <ul className="panel-tabs">
            <li className={"active"}>
                <Link to={ "/dashboard/designer?left_tab=Plants" }>Plants</Link>
            </li>
            <li>
                <Link to={ "/dashboard/designer?left_tab=Groups" }>Groups</Link>
            </li>
            <li>
                <Link to={ "/dashboard/designer?left_tab=Zones" }>Zones</Link>
            </li>
          </ul>
        </div>
        <div className="search-box-wrapper">
          <i class="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
        </div>
        <div className="object-list">
          <label>Current Plants</label>
          <List plants={ this.props.plants.all } />
        </div>
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
