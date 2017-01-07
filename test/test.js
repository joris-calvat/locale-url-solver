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
                /*de: /^http(s)?:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)?de\.)/,
                fr: /^http(s)?:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)?fr\.)/,
                en: /^http(s)?:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)?en\.)/,
                it: /^http(s)?:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)?it\.)/,*/
                "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
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
        
        let locale = LocaleUrlSolver.solve('https://www.website.com/fr/');
        Code.expect(locale).to.equal('fr');
        done();
    });

    lab.test('it should get it locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://it.website.com/');
        Code.expect(locale).to.equal('it');
        done();
    });
});



lab.experiment('more experiments', () => {
    
    lab.experiment('get locales keys count test-1 ', () => {

        lab.before((done) => {

            LocaleUrlSolver({
                default: 'de',
                locales: {
                    "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test('should have 4 keys', (done) => {
            
            let locales = LocaleUrlSolver.getLocales();
            Code.expect(locales.length).to.equal(4);
            done();
        });

    });



    lab.experiment('get locales keys count test-2 ', () => {
        
        lab.before((done) => {

            LocaleUrlSolver({
                default: 'es',
                locales: {
                    "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test('should have 5 keys', (done) => {

            let locales = LocaleUrlSolver.getLocales();
            Code.expect(locales.length).to.equal(5);
            done();
        });
    });

    lab.experiment('locale is set ', () => {
        
        lab.before((done) => {

            LocaleUrlSolver({
                default: 'es',
                locales: {
                    "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test('should not have japan', (done) => {
            
            let isSet = LocaleUrlSolver.isSet('jp');
            Code.expect(isSet).to.equal(false);
            done();
        });

        lab.test('should have german', (done) => {
            
            let isSet = LocaleUrlSolver.isSet('de');
            Code.expect(isSet).to.equal(true);
            done();
        });
    });
});

module.exports = {
    lab: lab
};