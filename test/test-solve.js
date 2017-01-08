'use strict';

var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('solve method', () => {

    lab.before((done) => {
        LocaleUrlSolver({
            default: 'de',
            locales: {
                "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
            }
        });

        done();
    });

    lab.test('should return default locale', (done) => {
        
        let locale = LocaleUrlSolver.solve('somethingwrong');
        Code.expect(locale).to.equal('de');
        done();
    });

    lab.test('should return default locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('http://www.website.com');
        Code.expect(locale).to.equal('de');
        done();
    });

    lab.test('should return default locale too using https', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://www.website.com');
        Code.expect(locale).to.equal('de');
        done();
    });

    lab.test('should return fr locale', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://fr.website.com');
        Code.expect(locale).to.equal('fr');
        done();
    });

    lab.test('should return fr locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://www.website.com/fr/');
        Code.expect(locale).to.equal('fr');
        done();
    });

    lab.test('should return it locale too', (done) => {
        
        let locale = LocaleUrlSolver.solve('https://it.website.com/');
        Code.expect(locale).to.equal('it');
        done();
    });
});

module.exports = {
    lab: lab
};