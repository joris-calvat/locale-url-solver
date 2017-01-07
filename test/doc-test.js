'use strict';

var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('LocaleUrlSolver documentation init part', () => {

    lab.experiment('many policies', () => {

        lab.before((done) => {
            LocaleUrlSolver({
                default: 'en',
                locales: {
                    'de': /^http(s)?:\/\/[^\/]*((.de)|\/de)($|\/)/,
                    'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/
                }
            });

            done();
        });

        lab.test("it should get default locale 'en' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com');
            Code.expect(locale).to.equal('en');
            done();
        });

        lab.test("it should get locale 'fr' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("it should get locale 'fr' too ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com/path/is/long');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("it should get locale 'de' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.de');
            Code.expect(locale).to.equal('de');
            done();
        });

        lab.test("it should get locale 'de' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/de');
            Code.expect(locale).to.equal('de');
            done();
        });
    });


    lab.experiment('global policy', () => {

        lab.before((done) => {
            LocaleUrlSolver({
                default: 'en',
                locales: {
                    'de|fr|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test("it should get default locale 'en' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com');
            Code.expect(locale).to.equal('en');
            done();
        });

        lab.test("it should get locale 'fr' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("it should get locale 'fr' too ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com/path/is/long');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("it should get locale 'de' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/de');
            Code.expect(locale).to.equal('de');
            done();
        });

        lab.test("it should get locale 'es' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/es/path/is/long/');
            Code.expect(locale).to.equal('es');
            done();
        });
    });
        
});


module.exports = {
    lab: lab
};