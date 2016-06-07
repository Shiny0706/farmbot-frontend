import { Plant } from "./interfaces";
import { generateReducer } from "../generate_reducer";
import { DesignerState } from "./interfaces";
import { cloneDeep } from "lodash";

let probe = (s, a) => {
    console.log(`➫ ${ a.type }`)
    return s;
};

export let designer = generateReducer<DesignerState>({plants: []}, probe);

designer
  .add<Plant[]>(function FETCH_PLANTS_OK(s, a) {
    let state = cloneDeep(s);
    state.plants = a.payload;
    return state;
  });
