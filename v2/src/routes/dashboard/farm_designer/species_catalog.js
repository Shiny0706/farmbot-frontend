import React from 'react';
import { Plant } from '../../../models/plant'
import { Species } from '../../../models/species';

export class SpeciesCatalogTile extends React.Component {
  render() {
    var specimen = this.props.specimen;
    var url = "#s/designer?designer_left_menu=SpeciesInfo&selected_specimen_id="
                + specimen._id;
    return(
      <div className="plantCatalogTile">
        <div className="row">
          <div className="small-12 columns">
            <div className="small-header-wrapper">
              <h5>{ specimen.name }</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns">
            <div className="content-wrapper">
              <p>
                <a href={ url }>
                  <img src={ specimen.imgUrl } />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export class SpeciesCatalog extends React.Component {
  render() {
    var species = this.props.global.species.map(
       (specimen, k) => <SpeciesCatalogTile specimen={ specimen }
                                       key={ k }
                                       dispatch={ this.props.dispatch } />
     );

    return <div id="designer-left">
            <div className="green-content">
              <div className="search-box-wrapper">
                <p>
                  <a href="?designer_left_menu=PlantInventory">
                    <i className="fa fa-arrow-left"></i>
                  </a>
                  Choose a Species
                </p>
              </div>
            </div>
            <div>
              <br/>
              { species }
            </div>
           </div>
  }
}
