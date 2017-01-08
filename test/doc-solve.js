
var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('init and solve part for', () => {

    lab.experiment('simple pattern', () => {

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

        lab.test("should return default locale 'en'", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com');
            Code.expect(locale).to.equal('en');
            done();
        });

        lab.test("should return locale 'fr' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("should return locale 'fr' too ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com/path/is/long');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("should return locale 'de' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.de');
            Code.expect(locale).to.equal('de');
            done();
        });

        lab.test("should return locale 'de' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/de');
            Code.expect(locale).to.equal('de');
            done();
        });
    });


    lab.experiment('grouped pattern', () => {

        lab.before((done) => {
            LocaleUrlSolver({
                default: 'en',
                locales: {
                    'de|fr|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test("should return default locale 'en' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com');
            Code.expect(locale).to.equal('en');
            done();
        });

        lab.test("should return locale 'fr' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("should return locale 'fr' too ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com/path/is/long');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("should return locale 'de' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/de');
            Code.expect(locale).to.equal('de');
            done();
        });

        lab.test("should return locale 'es' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/es/path/is/long/');
            Code.expect(locale).to.equal('es');
            done();
        });
    });

    
    lab.experiment('change search keyword', () => {

        lab.before((done) => {

            LocaleUrlSolver({
                default: 'en',
                locales: {
                    'de|fr|es': /^http(s)?:\/\/([^\/]*\/STUFF($|\/)|STUFF\.[^\/]+($|\/)(.*)$)/
                },
                search:'STUFF'
            });

            done();
        });

        lab.test("should return locale 'es' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/es/path/is/long/');
            Code.expect(locale).to.equal('es');
            done();
        });
    });


    
    lab.experiment('mix patterns', () => {

        lab.before((done) => {

            LocaleUrlSolver({
                default: 'en',
                locales: {
                    'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
                    'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test("should return locale 'fr' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://fr.website.com');
            Code.expect(locale).to.equal('fr');
            done();
        });

        lab.test("should return locale 'es' ", (done) => {
            
            let locale = LocaleUrlSolver.solve('http://www.website.com/es/path/is/long/');
            Code.expect(locale).to.equal('es');
            done();
        });
    });



        
});


module.exports = {
    lab: lab
};