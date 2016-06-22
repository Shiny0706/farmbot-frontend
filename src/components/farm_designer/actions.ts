import { authHeaders } from "../auth/util";
import * as Axios from "axios";
import { error } from "../../logger";
import { Plant, CropLiveSearchResult } from "./interfaces";
import { CropSearchResult, OpenFarm } from "./openfarm";

const PLANT_URL = "api/plants";

export function fetchPlants(baseUrl: string, token: string) {
    let url = baseUrl + "/" + PLANT_URL;
    return function (dispatch, getState) {
        dispatch({ type: "FETCH_PLANTS_START" });
        return Axios.get<Plant[]>(url, authHeaders(token))
            .then((resp) => {
                let payload = resp.data;
                dispatch({ type: "FETCH_PLANTS_OK", payload });
            })
            .catch((payload) => {
                error("Tried to download plants, but couldn't.");
                dispatch({ type: "FETCH_PLANTS_ERR", payload });
            });

    };
};

export function savePlant(plant: Plant, baseUrl: string, token: string) {
    let url = baseUrl + PLANT_URL;
    return function (dispatch, getState) {
        dispatch({ type: "SAVE_PLANT_START" });
        return Axios.post<Plant>(url, plant, authHeaders(token))
            .then((resp) => {
                let payload = resp.data;
                dispatch({ type: "SAVE_PLANT_OK", payload });
            })
            .catch((payload) => {
                error("Tried to save plant, but couldn't.");
                dispatch({ type: "SAVE_PLANT_ERR", payload });
            });
    };
};

export function destroyPlant(plant: Plant, baseUrl: string, token: string) {
    let url = baseUrl + PLANT_URL + "/" + plant._id;
    return function (dispatch, getState) {
        dispatch({ type: "DESTROY_PLANT_START" });
        return Axios.delete<Plant>(url, authHeaders(token))
            .then((resp) => {
                let payload = plant;
                dispatch({ type: "DESTROY_PLANT_OK", payload });
            })
            .catch((payload) => {
                error("Tried to delete plant, but couldn't.");
                dispatch({ type: "DESTROY_PLANT_ERR", payload });
            });
    };
};


let _openFarmSearchQuery = _.throttle(function (q) {
    let url = `${OpenFarm.cropUrl}?include=pictures&filter=${q}`;
    return Axios.get<CropSearchResult>(url);
}, 750);

let STUB_IMAGE = "http://placehold.it/200x150";

/** Search openfarm for crops. This is a throttled function, useful for live search. */
export function openFarmSearchQuery(query: string) { // TODO make less smelly
    return function (dispatch: Function) {
        dispatch({
            type: "SEARCH_QUERY_CHANGE",
            payload: query
        });
        return _openFarmSearchQuery(query)
            .then((resp) => {
                window["reppp"]  = resp;
                // Only some crops will have images...
                let images: {[key: string]: string} = {};
                resp
                  .data
                  .included
                  .map((item) => ({
                          id: item.id,
                          url: item.attributes.thumbnail_url
                   }))
                  .map((val, acc) => images[val.id] = val.url);
                console.dir(images);
                let payload = resp
                  .data
                  .data
                  .map(function(crop) {
                      let id = _.get<string>(crop, "relationships.pictures.data[0].id");
                      return { crop, image: (images[id] || STUB_IMAGE) };
                  });

                dispatch({
                    type: "OF_SEARCH_RESULTS_OK",
                    payload
                });
            })
            .catch((error) => console.error("OPENFARM IS DOWN!!"));
    };
};
