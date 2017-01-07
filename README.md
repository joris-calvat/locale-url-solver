
## Introduction

locale-url-solver is a nodejs module.

It helps you to to get the locale related to your urls.
But first you have to specify your own policy. 

It can be used :
- server side with your prefered framework
- in the browser if you require('locale-url-solver') it in your javascript blender

## Requirements

You have to be familiar with [regular expressions](https://en.wikipedia.org/wiki/Regular_expression)

## Install

```bash
$ npm install locale-url-solver
```

## How to use ?

```javascript
const LocaleUrlSolver = require('locale-url-solver');
```

### Init and solve

#### Simple patterns

Specify a default locale. 
Then set locales patterns.

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'de': /^http(s)?:\/\/[^\/]*((.de)|\/de)($|\/)/,
        'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/
    }
});

LocaleUrlSolver.solve('http://www.website.com');
>> en

LocaleUrlSolver.solve('http://fr.website.com');
>> fr

LocaleUrlSolver.solve('http://fr.website.com/path/is/long');
>> fr

LocaleUrlSolver.solve('http://www.website.de');
>> de

LocaleUrlSolver.solve('http://www.website.com/de');
>> de
```

#### Grouped pattern

You may have a global policy, you can simplify with one pattern
- locale keys are separated by '|' 
- the 'LANG' keyword represent a locale

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'de|fr|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});

LocaleUrlSolver.solve('http://www.website.com');
>> en

LocaleUrlSolver.solve('http://fr.website.com');
>> fr

LocaleUrlSolver.solve('http://fr.website.com/path/is/long');
>> fr

LocaleUrlSolver.solve('http://www.website.com/de');
>> de

LocaleUrlSolver.solve('http://www.website.com/es/path/is/long/');
>> es
```

By default it looks for the 'SEARCH' word, you can change it easily

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'de|fr|es': /^http(s)?:\/\/([^\/]*\/STUFF($|\/)|STUFF\.[^\/]+($|\/)(.*)$)/
    },
    search:'STUFF'
});
```

#### Mix simple patterns and grouped patterns

You can use all patterns

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
        'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});
```

### Get the locale keys list

```javascript
LocaleUrlSolver.getLocales();
>> [ 'de', 'en', 'fr', 'it' ]
```

### Is a locale set in my rules ?

```javascript
LocaleUrlSolver.isSet('it');
>> true
```