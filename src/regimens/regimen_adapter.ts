import { Regimen } from "./interfaces";
import { Color } from "../interfaces";

export interface ApiReadyRegimenItem {
    time_offset: number;
    sequence_id: string;
};

export interface ApiReadyRegimen {
    name: string;
    color: Color;
    regimen_items: ApiReadyRegimenItem[];
};

/**
 * Transforms local Regimen object into format suitable for use with FarmBot
 * API's "/api/regimens" endpoint.
 */
export function regimenAdapter(input: Regimen): ApiReadyRegimen {
    const regimen = _.clone<Regimen>(input);
    const regimen_items = regimen
      .regimen_items
      .map<ApiReadyRegimenItem>(function (r) {
        if (r && r.sequence && r.sequence._id) {
            return {
                time_offset: r.timeOffset,
                sequence_id: r.sequence._id
            };
        } else {
            throw new Error(`Array regimen.regimen_items may only contain
                           objects with an "_id" property.`);
        }
    });

    return {
        name: regimen.name,
        color: regimen.color,
        regimen_items
    };
};
