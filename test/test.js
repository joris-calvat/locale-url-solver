'use strict';

var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('LocaleUrlSolver', () => {

    lab.before((done) => {
        LocaleUrlSolver({
            default: 'de',
            locales: {
                de: /^http(s)?:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)?de\.)/,
                fr: /^http(s)?:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)?fr\.)/,
                en: /^http(s)?:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)?en\.)/,
                it: /^http(s)?:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)?it\.)/
            }
        });

        done();
    });

    lab.test('it should get default locale', (done) => {
        
        let locale = LocaleUrlSolver.solve('somethingwrong');
        Code.expect(locale).to.equal('de');
        done();
    });

    lab.test('it should get default locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('http://www.website.com');
        Code.expect(locale).to.equal('de');
        done();
    });

    lab.test('it should get default locale too using https', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://www.website.com');
        Code.expect(locale).to.equal('de');
        done();
    });

    lab.test('it should get fr locale', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://fr.website.com');
        Code.expect(locale).to.equal('fr');
        done();
    });

    lab.test('it should get fr locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://beta.website.com/fr/');
        Code.expect(locale).to.equal('fr');
        done();
    });

    lab.test('it should get it locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://beta.it.website.com/');
        Code.expect(locale).to.equal('it');
        done();
    });
});



lab.experiment('more helpers', () => {
    

    lab.before((done) => {
        LocaleUrlSolver({
            default: 'de',
            locales: {
                de: /^http(s)?:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)?de\.)/,
                fr: /^http(s)?:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)?fr\.)/,
                en: /^http(s)?:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)?en\.)/,
                it: /^http(s)?:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)?it\.)/
            }
        });

        done();
    });

    lab.test('it should get locales keys', (done) => {
        
        let locales = LocaleUrlSolver.getLocales();
        Code.expect(locales.length).to.equal(4);
        console.log(locales);
        done();
    });

    lab.test('it should get one more locale key', (done) => {

        LocaleUrlSolver({
            default: 'es',
            locales: {
                de: /^http(s)?:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)?de\.)/,
                fr: /^http(s)?:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)?fr\.)/,
                en: /^http(s)?:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)?en\.)/,
                it: /^http(s)?:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)?it\.)/
            }
        });

        let locales = LocaleUrlSolver.getLocales();
        Code.expect(locales.length).to.equal(5);
        done();
    });

    lab.test('it should not have japan locale', (done) => {
        
        let isSet = LocaleUrlSolver.isSet('jp');
        Code.expect(isSet).to.equal(false);
        done();
    });

    lab.test('it should have german locale', (done) => {
        
        let isSet = LocaleUrlSolver.isSet('de');
        Code.expect(isSet).to.equal(true);
        done();
    });
});

module.exports = {
    lab: lab
};