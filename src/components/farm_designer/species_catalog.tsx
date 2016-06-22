import * as React from "react";
import { Link } from "react-router";
import { BackArrow } from "./back_arrow";
import { Specimen, DesignerState, CropLiveSearchResult } from "./interfaces";
import { openFarmSearchQuery } from "./actions";

interface SpeciesCatalogTileProps {
  result: CropLiveSearchResult;
  dispatch: Function;
}

export function SpeciesCatalogTile({result}: SpeciesCatalogTileProps) {
    // let specimen = this.props.specimen;
    let url = "/app/dashboard/designer?p1=SpeciesInfo&id="
      + result.crop.slug;
    console.dir(result.crop);
    return (
      <div className="plantCatalogTile">
        <div className="small-header-wrapper">
          <label>{ result.crop.name }</label>
        </div>
        <div>
          <p>
            <Link to={ url }>
              <img className="crop-drag-info-image" src={ result.image } />
            </Link>
          </p>
        </div>
      </div>
    );
};

interface SpeciesCatalogProps {
  designer: DesignerState;
  dispatch: Function;
}

export class SpeciesCatalog extends React.Component<SpeciesCatalogProps, any> {
  render() {
    let species = this.props.designer.cropSearchResults.map(
      (result, k) => <SpeciesCatalogTile result={ result }
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
