import * as React from "react";
import { Regimen } from "../interfaces";
import { RegimenItemList } from "./regimen_item_list";
import { RegimenNameInput } from "./regimen_name_input";

interface ActiveEditorProps {
    regimen: Regimen;
    dispatch: Function;
}

/** The bottom half of the regimen editor panel (when there's something to
    actually edit). */
export function ActiveEditor({ regimen, dispatch }: ActiveEditorProps) {
    return <div>
        <RegimenNameInput regimen={ regimen } dispatch={ dispatch } />
        <RegimenItemList items={ regimen.items } />
    </div>;
}
