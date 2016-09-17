import * as React from "react";
import { Link } from "react-router";
import { Plant } from "./interfaces";
import { Everything } from "../interfaces";

const pathname = "/app/dashboard/designer";

export class Plants extends React.Component<Everything, any> {
  render() {
    return(
      <div className="panel-container green-panel">
        <div className="panel-header green-panel">
          <div className="main-nav-button">
            <button className="navbar-toggle hidden-sm hidden-md hidden-lg"
                    data-target="#navbar"
                    data-toggle="collapse"
                    type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="panel-tabs">
            <ul>
              <li className="hidden-sm hidden-md hidden-lg">
                  <Link to={ { pathname, query: { p1: "NoTab" }} }>Designer</Link>
              </li>
              <li>
              <Link to={ { pathname, query: { p1: "Plants" }} }  className={"active"}>
                Plants
              </Link>
              </li>
              <li>
                <Link to={ { pathname, query: { p1: "Groups" }} }>
                  Groups
                </Link>
              </li>
              <li>
              <Link to={ { pathname, query: { p1: "Zones" }} }>
                Zones
              </Link>
              </li>
              <li className="hidden-sm hidden-md hidden-lg">
                  <Link to={ {
                    pathname,
                    query: { p1: "Panel2" }} }>
                      Calendar
                  </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="panel-content">
          <i className="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
          <div className="object-list">
            <label>Current Plants</label>
            <List plants={ this.props.designer.plants } />
          </div>
        </div>
        <Link to={ { pathname, query: { p1: "SpeciesCatalog" }} }>
          <div className="plus-button add-plant button-like"
               data-toggle="tooltip"
               title="Add plant">
            <i className="fa fa-2x fa-plus" />
          </div>
        </Link>
      </div>
    );
  }
};

interface ListProps {
  plants: Plant[];
}
export class List extends React.Component<ListProps, any> {
  render() {
    let mapper = function(plant: Plant, key: number) {
      return(
        <li key={ key } >
          <Link to={ {
                pathname: "/app/dashboard/designer",
                query: { p1: "PlantInfo", id: (plant.openfarm_slug || "") }
              } }>
            { plant.name }
          </Link>
          <p>{ plant.planted_at || "Unknown planting time" }</p>
        </li>);
    };
    return(<ul>
             { this.props.plants.map(mapper) }
           </ul>);
  }
};
