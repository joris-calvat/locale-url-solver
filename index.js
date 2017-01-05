var rawRules = [];
var rules = {
    default: 'en',
    locales: {}
};

const setRules = (r) => {
    rules = r;
};

setRules.solve = (url) => {
    for (var locale in rules.locales) {
        var r = rules.locales[locale];
        if(url.search(r)>-1) {
            return locale;
        }
    }
    return rules.default;
};

module.exports = setRules;