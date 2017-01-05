locale url solver

## Introduction

apply your own policy to get the locale related to your urls

## install
```bash
$ npm install locale-url-solver
```

## how to use

### init

```javascript
const LocaleUrlSolver = require('locale-url-solver');

LocaleUrlSolver({
    default: 'de',
    locales: {
        de: /^http(s)*:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)*de\.)/,
        fr: /^http(s)*:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)*fr\.)/,
        en: /^http(s)*:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)*en\.)/,
        it: /^http(s)*:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)*it\.)/
    }
});
```

### use it

```javascript
var locale = LocaleUrlSolver.solve('https://fr.website.com');
console.log(locale);
```
```bash
fr
```
