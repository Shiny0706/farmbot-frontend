import { Plant } from "./interfaces";
/** PROBLEM: OpenFarm doesn't do icons yet.
 *  SOLUTION: Temporarily hard code icons on our end as a proof-of-concept
 *  until we work something out with OF.
 */
let TEMP_ICON_MAP: {[ofSlug: string]: string} = {
    "apple-tree": "/icons/Apple-96.png",
    "asparagus": "/icons/Asparagus-96.png",
    "avocado": "/icons/Avocado-96.png",
    "banana-shrub": "/icons/Banana-96.png",
    "barley": "/icons/Barley-96.png",
    "beets": "/icons/Beet-96.png",
    "broccoli": "/icons/Broccoli-96.png",
    "cabbage": "/icons/Cabbage-96.png",
    "cactus": "/icons/Cactus-96.png",
    "carrots": "/icons/Carrot-96.png",
    "celery": "/icons/Celery-96.png",
    "cherry-tree": "/icons/Cherry-96.png",
    "chilli-pepper": "/icons/Chili-96.png Pepper",
    "lemon": "/icons/Citrus-96.png",
    "coniferous-tree": "/icons/Confierous-96.png Tree",
    "corn": "/icons/Corn-96.png",
    "cucumber": "/icons/Cucumber-96.png",
    "deciduous-tree": "/icons/Deciduous-96.png Tree",
    "dragon-fruit": "/icons/Dragon-96.png Fruit",
    "eggplant": "/icons/Eggplant-96.png",
    "flowers": "/icons/Flower-96.png",
    "garlic": "/icons/Garlic-96.png",
    "grapes": "/icons/Grapes-96.png",
    "grass": "/icons/Grass-96.png",
    "hazelnut": "/icons/Hazelnut-96.png",
    "hops": "/icons/Hops-96.png",
    "kiwi": "/icons/Kiwi-96.png",
    "kohlrabi": "/icons/Kohlrabi-96.png",
    "leek": "/icons/Leek-96.png",
    "lettuce": "/icons/Lettuce-96.png",
    "maple": "/icons/Maple-96.png leaf",
    "melon": "/icons/Melon-96.png",
    "mushrooms": "/icons/Mushroom-96.png",
    "Acorns": "/icons/Nut-96.png",
    "olives": "/icons/Olive-96.png",
    "onion": "/icons/Onion-96.png",
    "palm-tree": "/icons/Palm-96.png Tree",
    "paprika": "/icons/Paprika-96.png",
    "peach": "/icons/Peach-96.png",
    "peanut": "/icons/Peanuts-96.png",
    "pear": "/icons/Pear-96.png",
    "peas": "/icons/Peas-96.png",
    "pineapple": "/icons/Pineapple-96.png",
    "plum": "/icons/Plum-96.png",
    "pomegranate": "/icons/Pomegranate-96.png",
    "potato": "/icons/Potato-96.png",
    "radish": "/icons/Radish-96.png",
    "raspberry": "/icons/Raspberry-96.png",
    "sesame": "/icons/Sesame-96.png",
    "soy": "/icons/Soy-96.png",
    "strawberry": "/icons/Strawberry-96.png",
    "sweet-potato": "/icons/Sweet-96.png Potato",
    "tomato": "/icons/Tomato-96.png",
    "watermelon": "/icons/Watermelon-96.png",
    "wheat": "/icons/Wheat-96.png",
    "not-set": "/icons/Natural Food-96.png"
};

interface PlantOptions {
    _id?: string;
    created_at?: number;
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
    let icon = TEMP_ICON_MAP[openfarm_slug] ||  TEMP_ICON_MAP["not-set"];
    return {
        _id: String(options._id || ""),
        planted_at: (options.age || _.random(0, 5)),
        img_url: (options.imgUrl || "http://placehold.it/200x150"),
        name: (options.name || "Untitled Plant"),
        x: (options.x || 0),
        y: (options.y || 0),
        planting_area_id: (options.planting_area_id || ""),
        icon_url,
        openfarm_slug
    };
}
