
var rules, defaultLocale, locales, searchKey;

const init = () => {

    rules = new Array();
    locales = new Array();
    defaultLocale = null;
    searchKey = 'LANG';
}

const Solver = (r) => {

    init();

    searchKey = r.search || searchKey;

    for(let localeNames in r.locales) {

        let currentPolicy = r.locales[localeNames];
        let names = localeNames.split('|');


        for(let i = 0; i<names.length; i++) {

            let name = names[i];

            if(defaultLocale === null) {
                defaultLocale = name;
            }

            let policy = currentPolicy.toString().replace(new RegExp(searchKey, 'g'), name);
            rules.push({
                name:name,
                rule: new RegExp(policy.substr(0, policy.length-1).substr(1))
            });
            locales.push(name);
        }

        defaultLocale = r.default || defaultLocale;

        if(locales.indexOf(defaultLocale) === -1) {
            locales.push(defaultLocale);
        }

        locales.sort();
    }
};

Solver.solve = (url) => {

    for (let i = 0; i<rules.length; i++) {
        var r = rules[i];
        if(url.search(r.rule)>-1) {
            return r.name;
        }
    }
    return defaultLocale;
};

Solver.getDefault = () => {

    return defaultLocale;
};

Solver.getLocales = () => {

    return locales;
};

Solver.isSet = (locale) => {

    if(defaultLocale === locale) {
        return true;
    }

    for (let i = 0; i<rules.length; i++) {
        if(rules[i].name === locale) {
            return true;
        }
    }

    return false;
};

/*
Solver.getRules = () => {
    return rules;
}
*/

module.exports = Solver;