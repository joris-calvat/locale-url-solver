
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

### Init

Init with a litteral object :

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
        'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});
```

### Solve an url to get the locale

#### Simple patterns

A key is a locale 

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

A key is a group of locales 

You may have a global url policy, you can simplify with one pattern
- locale keys are separated by '|'
- the 'LANG' keyword represents a locale

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'de|fr|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});

LocaleUrlSolver.solve('http://www.website.com/es/path/is/long/');
>> es
```

It looks for the 'LANG' word, you can change this keyword

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

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
        'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});
```

### Set and get default locale

Default locale can be explicitly set

```javascript
LocaleUrlSolver({
    default: 'en',
    locales: {
        'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
        'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});

LocaleUrlSolver.getDefault();
>> en
```

If not specified, the default locale is the first key

```javascript
LocaleUrlSolver({
    locales: {
        'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
        'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
    }
});

LocaleUrlSolver.getDefault();
>> fr
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

## Perfomances

The first match returns the locale.
So the order of the rules is important:
- add a default locale rule at the first position.
- order the rules according to your website traffic.

## Test coverage

This module is 100% covered by 33 tests 