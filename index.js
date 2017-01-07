
var rules = {
    default: 'en',
    locales: {}
};



const Solver = (r) => {

    rules = r;
};

Solver.solve = (url) => {

    for (var locale in rules.locales) {
        var r = rules.locales[locale];
        if(url.search(r)>-1) {
            return locale;
        }
    }
    return rules.default;
};

Solver.getLocales = () => {

    var list = [];//rules.locales.keys();
    for (var locale in rules.locales) {
        list.push(locale);
    }

    if(list.indexOf(rules.default) === -1) {
        list.push(rules.default);
    }
    return list.sort();
};

Solver.isSet = (locale) => {

    return rules.locales[locale] !== undefined || rules.default === locale  ? true:false;
};

module.exports = Solver;