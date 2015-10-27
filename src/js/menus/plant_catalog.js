import React from 'react';
import { Plant } from '../models/plant';
import { Species } from '../models/species';

export class PlantCatalogTile extends React.Component {
  showPlantInfo(){
    this.props.dispatch({
      type: 'SPECIES_INFO_SHOW',
      payload: this.props.plant
    });
  };

  render() {
    return(
      <div className="plantCatalogTile" onClick={ this.showPlantInfo.bind(this) }>
        <div className="row">
          <div className="small-12 columns">
            <div className="small-header-wrapper">
              <h5>{ this.props.plant.name }</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns">
            <div className="content-wrapper">
              <p> <img src={this.props.plant.imgUrl} /> </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export class PlantCatalog extends React.Component {
  render() {
    var plants = this.props.global.plants.map(
       (plant, k) => <PlantCatalogTile plant={ plant }
                                       key={ k }
                                       dispatch={ this.props.dispatch } />
     );

    return <div id="designer-left">
            <div className="green-content">
              <div className="search-box-wrapper">
                <p>
                  <a href="#s/designer?designer_left_menu=PlantInventory">
                    <i className="fa fa-arrow-left"></i>
                  </a>
                  Choose a Crop
                </p>
              </div>
            </div>
            <div plants={ this.props.global.plants }>
              <br/>
              { plants }
            </div>
           </div>
  }
}
