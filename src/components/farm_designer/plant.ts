import { Plant } from "./interfaces";

interface PlantOptions {
    _id?: string;
    age?: number;
    imgUrl?: string;
    name?: string;
    x?: number;
    y?: number;
    planting_area_id?: string;
}

/** Factory function for Plant types. */
export function Plant(options: PlantOptions): Plant {
    return {
        _id: String(options._id || ""),
        age: (options.age || _.random(0, 5)),
        imgUrl: (options.imgUrl || "http://placehold.it/200x150"),
        name: (options.name || "Untitled Plant"),
        x: (options.x || 0),
        y: (options.y || 0),
        planting_area_id: (options.planting_area_id || ""),
        icon: "/icons/Natural Food-96.png"
    };
}
