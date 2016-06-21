export interface Plant {
    _id: string;
    age: number;
    imgUrl: string;
    name: string;
    x: number;
    y: number;
    planting_area_id: string;
    icon: string; // ? Maybe this will change.
}

export interface Specimen {
  _id: string;
  name: string;
  imgUrl: string;
}

export interface DesignerState {
  x_size: number;
  y_size: number;
  plants: Plant[];
}
