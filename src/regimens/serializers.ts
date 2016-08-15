import { Regimen } from "./interfaces";
import { Color } from "../interfaces";
import { RegimenItem } from "./interfaces";

/** RegimenItem, as presented by the REST API */
export interface ApiRegimenItem {
    _id?: string;
    regimen_id?: string;
    time_offset: number;
    sequence_id: string;
};

/** Regimen, as presented by the REST API */
export interface ApiRegimen {
    name: string;
    color: Color;
    regimen_items: ApiRegimenItem[];
};

/**
 * Transforms local Regimen object into format suitable for use with FarmBot
 * API's "/api/regimens" endpoint.
// export function regimenItemDeserializer(input: ApiRegimenItem): RegimenItem[] {
//   return {};
// };
 */
export function regimenSerializer(input: Regimen): ApiRegimen {
    const regimen = _.clone<Regimen>(input);
    const regimen_items = regimen
        .regimen_items
        .map<ApiRegimenItem>(function wow(r) {
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

// export function regimenItemDeserializer(input: ApiRegimenItem[]): RegimenItem[] {
//     let output = input.map<RegimenItem>((i) => {
//         return {
//             // sequence: {
//             //     color: Color;
//             //     name: string;
//             //     steps: Steps;
//             // },
//             timeOffset: i.time_offset
//         };
//     });
//     return output;
// };
