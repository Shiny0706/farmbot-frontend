import { generateReducer } from "../generate_reducer";
import { DesignerState } from "./interfaces";

export let designer = generateReducer<DesignerState>( { foo: "bar" } );


designer.add(function LOGIN_OK(s, a) {
    console.dir(a.payload);
    return s;
});
