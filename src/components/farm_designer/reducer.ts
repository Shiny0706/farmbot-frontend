import { generateReducer } from "../generate_reducer";
import { DesignerState } from "./interfaces";

export let designer = generateReducer<DesignerState>(
    { foo: "bar" },
    function catchAll(s, a) {
        console.log(`Looks like the reducer was installed correctly. ${a.type}.`);
        return s;
    });

designer.add(function FETCH_PLANTS_FAILURE(s, a) {
    console.log("Failed to fetch them plants.");
    return s;
});
