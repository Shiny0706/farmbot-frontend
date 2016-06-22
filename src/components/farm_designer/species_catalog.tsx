import * as React from "react";
import { Link } from "react-router";
import { BackArrow } from "./back_arrow";
import { Specimen, DesignerState } from "./interfaces";
import { openFarmSearchQuery } from "./actions";

interface SpeciesCatalogTileProps {
  specimen: Specimen;
  dispatch: Function;
}

export class SpeciesCatalogTile extends React.Component<SpeciesCatalogTileProps, any> {
  render() {
    let specimen = this.props.specimen;
    let url = "/app/dashboard/designer?p1=SpeciesInfo&id="
      + specimen._id;
    return (
      <div className="plantCatalogTile">
        <div className="small-header-wrapper">
          <label>{ specimen.name }</label>
        </div>
        <div>
          <p>
            <Link to={ url }>
              <img className="crop-drag-info-image" src={ specimen.imgUrl } />
            </Link>
          </p>
        </div>
      </div>
    );
  }
};

interface SpeciesCatalogProps {
  designer: DesignerState;
  dispatch: Function;
}

export class SpeciesCatalog extends React.Component<SpeciesCatalogProps, any> {
  render() {
    let species = [{
      name: "Placeholder Berries", imgUrl: "http://placehold.it/200x150", _id: "123"
    }].map(
      (specimen, k) => <SpeciesCatalogTile specimen={ specimen }
        key={ k }
        dispatch={ this.props.dispatch } />
      );
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow/> Choose a Species
        </p>
      </div>
      <div className="panel-content">
        <i className="fa fa-search"></i>
        <SearchBox query={ this.props.designer.cropSearchQuery }
                   dispatch={ this.props.dispatch } />
        <div className="search-underline"></div>
        <div className="panel-content">
          { species }
        </div>
      </div>
    </div>;
  }
}

interface SearchBoxParams {
  query: string;
  dispatch: Function
}

function SearchBox({query, dispatch}: SearchBoxParams) {
  return <input value={ query }
                onChange={ (e) => doSearch(e, dispatch) }
                className="search"
                placeholder="Search OpenFarm for crops"/>;
}

function doSearch(e: React.FormEvent, dispatch: Function) {
  dispatch(openFarmSearchQuery(e.target["value"]));
}
