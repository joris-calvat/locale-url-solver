
var rules = {
    default: 'en',
    locales: {}
};



const Solver = (r) => {
    rules = r;
};

Solver.solve = (url) => {
    for(let locale in rules.locales) {
        let r = rules[locale];
        if(url.search(r)>-1) {
            return locale;
        }
    }
    return rules.default;
};

Solver.getLocales = () => {
    return rules.locales.keys().sort();
};

Solver.isSet = (locale) => {
    return rules.locales[locale] == undefined ? false:true;
};


module.exports = Solver;