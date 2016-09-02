import { Plant } from "./interfaces";
/** PROBLEM: OpenFarm doesn't do icons yet.
 *  SOLUTION: Temporarily hard code icons on our end as a proof-of-concept
 *  until we work something out with OF.
 */
let TEMP_ICON_MAP: {[ofSlug: string]: string} = {
    "apple-tree": "/img/icons/Apple-96.png",
    "asparagus": "/img/icons/Asparagus-96.png",
    "avocado": "/img/icons/Avocado-96.png",
    "banana-shrub": "/img/icons/Banana-96.png",
    "barley": "/img/icons/Barley-96.png",
    "beets": "/img/icons/Beet-96.png",
    "broccoli": "/img/icons/Broccoli-96.png",
    "cabbage": "/img/icons/Cabbage-96.png",
    "cactus": "/img/icons/Cactus-96.png",
    "carrots": "/img/icons/Carrot-96.png",
    "celery": "/img/icons/Celery-96.png",
    "cherry-tree": "/img/icons/Cherry-96.png",
    "chilli-pepper": "/img/icons/Chili-96.png Pepper",
    "lemon": "/img/icons/Citrus-96.png",
    "coniferous-tree": "/img/icons/Confierous-96.png Tree",
    "corn": "/img/icons/Corn-96.png",
    "cucumber": "/img/icons/Cucumber-96.png",
    "deciduous-tree": "/img/icons/Deciduous-96.png Tree",
    "dragon-fruit": "/img/icons/Dragon-96.png Fruit",
    "eggplant": "/img/icons/Eggplant-96.png",
    "flowers": "/img/icons/Flower-96.png",
    "garlic": "/img/icons/Garlic-96.png",
    "grapes": "/img/icons/Grapes-96.png",
    "grass": "/img/icons/Grass-96.png",
    "hazelnut": "/img/icons/Hazelnut-96.png",
    "hops": "/img/icons/Hops-96.png",
    "kiwi": "/img/icons/Kiwi-96.png",
    "kohlrabi": "/img/icons/Kohlrabi-96.png",
    "leek": "/img/icons/Leek-96.png",
    "lettuce": "/img/icons/Lettuce-96.png",
    "maple": "/img/icons/Maple-96.png leaf",
    "melon": "/img/icons/Melon-96.png",
    "mushrooms": "/img/icons/Mushroom-96.png",
    "Acorns": "/img/icons/Nut-96.png",
    "olives": "/img/icons/Olive-96.png",
    "onion": "/img/icons/Onion-96.png",
    "palm-tree": "/img/icons/Palm-96.png Tree",
    "paprika": "/img/icons/Paprika-96.png",
    "peach": "/img/icons/Peach-96.png",
    "peanut": "/img/icons/Peanuts-96.png",
    "pear": "/img/icons/Pear-96.png",
    "peas": "/img/icons/Peas-96.png",
    "pineapple": "/img/icons/Pineapple-96.png",
    "plum": "/img/icons/Plum-96.png",
    "pomegranate": "/img/icons/Pomegranate-96.png",
    "potato": "/img/icons/Potato-96.png",
    "radish": "/img/icons/Radish-96.png",
    "raspberry": "/img/icons/Raspberry-96.png",
    "sesame": "/img/icons/Sesame-96.png",
    "soy": "/img/icons/Soy-96.png",
    "strawberry": "/img/icons/Strawberry-96.png",
    "sweet-potato": "/img/icons/Sweet-96.png Potato",
    "tomato": "/img/icons/Tomato-96.png",
    "watermelon": "/img/icons/Watermelon-96.png",
    "wheat": "/img/icons/Wheat-96.png",
    "not-set": "/img/icons/Natural Food-96.png"
};

export interface PlantOptions {
    id?: number;
    planted_at?: number;
    img_url?: string;
    name?: string;
    x?: number;
    y?: number;
    planting_area_id?: string;
    openfarm_slug?: string;
}

/** Factory function for Plant types. */
export function Plant(options: PlantOptions): Plant {
    let openfarm_slug = options.openfarm_slug || "not-set";
    let icon_url = TEMP_ICON_MAP[openfarm_slug] ||  TEMP_ICON_MAP["not-set"];
    return {
        id: options.id,
        planted_at: (options.planted_at || _.random(0, 5)),
        img_url: (options.img_url || "http://placehold.it/200x150"),
        name: (options.name || "Untitled Plant"),
        x: (options.x || 0),
        y: (options.y || 0),
        planting_area_id: (options.planting_area_id || ""),
        icon_url,
        openfarm_slug
    };
}
