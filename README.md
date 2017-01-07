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
        de: /^http(s)?:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)?de\.)/,
        fr: /^http(s)?:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)?fr\.)/,
        en: /^http(s)?:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)?en\.)/,
        it: /^http(s)?:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)?it\.)/
    }
});
```

### use it

```javascript
var locale = LocaleUrlSolver.solve('https://fr.website.com');
console.log(locale);
```
```bash
>> fr
```

### get locales

simply returns the list of locale keys list

```javascript
var locales = LocaleUrlSolver.getLocales();
console.log(locales);
```
```bash
>> [ 'de', 'en', 'fr', 'it' ]
```

### is a locale set

check if a locale is in the rules list

```javascript
var locales = LocaleUrlSolver.isSet('it');
console.log(locales);
```
```bash
>> true
```