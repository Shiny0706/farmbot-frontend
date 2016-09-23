import * as axios from "axios";
import  * as i18next  from "i18next";

function generateUrl(langCode) {
    let lang = langCode.slice(0, 2);
    let url =  "//" + location.host.split(":")
    [0] + ":" + location.port + "/app/languages/" + lang + ".js";
    return url;
};

function getUserLang(langCode = "en_us") {
    return axios.get(generateUrl(langCode))
    .then((resp: any) => {return langCode.slice(0, 2); })
    .catch((error: any) => {return "en"; });
};

function detectLanguage() {
    return getUserLang(navigator.language).then(function(lang){
        // TODO: Possiblly requires optimization using Webpack chunking.
        let langi = require("../app/languages/" + lang + ".js");
            return {
                nsSeparator: "",
                keySeparator: "",
                lng: lang,
                resources: { [lang]: { translation: langi } }
            };
        });
};


export let i18nextInit = function(){
    detectLanguage().then((config) => {
        i18next.init(config, (err, t) => {

        });
    });
};


