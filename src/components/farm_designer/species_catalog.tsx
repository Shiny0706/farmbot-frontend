import * as React from 'react';
import { Link } from 'react-router';
import { Plant } from '../../models/plant';
import { Species } from '../../models/species';
import { BackArrow } from './back_arrow';

export class SpeciesCatalogTile extends React.Component<any, any> {
  render() {
    let specimen = this.props.specimen;
    let url = "/dashboard/designer?p1=SpeciesInfo&id="
                + specimen._id;
    return(
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

export class SpeciesCatalog extends React.Component<any, any> {
  render() {
    let species = this.props.global.species.map(
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
              { species }
            </div>
          </div>
  }
}
