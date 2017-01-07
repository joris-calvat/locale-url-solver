const getDefaultRules = () => {
    return {
        default: 'en',
        locales: {},
        search:'LANG'
    };
};


var rules = getDefaultRules();



const Solver = (r) => {
    rules = getDefaultRules();
    rules.default = r.default || rules.default;
    rules.search = r.search || rules.search;

    let locales = r.locales;


    for(let localeNames in locales) {

        let currentPolicy = locales[localeNames];
        let names = localeNames.split('|');

        for(let i = 0; i<names.length; i++) {

            let name = names[i];
            let policy = currentPolicy.toString();
            policy = policy.replace(new RegExp(rules.search, 'g'), name);
            policy = policy.substr(0, policy.length-1).substr(1);
            rules.locales[name] = new RegExp(policy);
            //console.log(policy);
        }
    }
    //var tmpRulesObject = Object.assign({}, r)


    //rules = r;
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

Solver.getRules = () => {
    return rules;
}

module.exports = Solver;