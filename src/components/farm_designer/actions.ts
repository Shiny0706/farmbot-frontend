import { authHeaders } from "../auth/util";
import { get, post } from "axios";
import { error } from "../../logger";
import { Plant } from "./interfaces";

const PLANT_URL = "/api/plants";

export function designerUrl(plant) {
    return `/app/dashboard/designer?p1=PlantInfo&id=${plant._id}`;
};

export function fetchPlants(baseUrl: string, token: string) {
    let url = baseUrl + PLANT_URL;
    return function (dispatch, getState) {
        dispatch({ type: "FETCH_PLANTS_START" });
        return get<Plant[]>(url, authHeaders(token))
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
        dispatch({ type: "FETCH_PLANT_START" });
        post<Plant>(url, plant)
            .then((resp) => {
                let payload = resp.data;
                dispatch({ type: "FETCH_PLANT_OK", payload });
            })
            .catch((payload) => {
                error("Tried to download plants, but couldn't.");
                dispatch({ type: "FETCH_PLANT_ERR", payload });
            });
    };
};

export function destroyPlant(plant: Plant, baseUrl: string, token: string) {
    let url = baseUrl + PLANT_URL + plant._id;
    return function (dispatch, getState) {
        dispatch({ type: "DESTROY_PLANT_START" });
        post<Plant>(url, plant)
            .then((resp) => {
                let payload = resp.data;
                dispatch({ type: "DESTROY_PLANT_OK", payload });
            })
            .catch((payload) => {
                error("Tried to download plants, but couldn't.");
                dispatch({ type: "DESTROY_PLANT_ERR", payload });
            });
    };
};
