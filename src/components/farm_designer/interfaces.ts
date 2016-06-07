export interface Plant {
    _id: String;
    age: Number;
    imgUrl: String;
    name: String;
    x: Number;
    y: Number;
}

export interface Specimen {
  _id: string;
  name: string;
  imgUrl: string;
}

export interface DesignerState {
  plants: Plant[];
}
