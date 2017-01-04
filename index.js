var rawRules = [];
var rules = {
    default: 'en',
    locales: {}
};

const setRules = (r) => {
    rules = r;
};

setRules.solve = (url) => {
    for(let locale in rules.locales) {
        let r = rules[locale];
        if(url.search(r)>-1) {
            return locale;
        }
    }
    return rules.default;
};

module.exports = setRules;