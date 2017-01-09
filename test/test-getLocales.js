
var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('getLocales method should', () => {

    lab.experiment('not duplicate default locale', () => {

        lab.before((done) => {

            LocaleUrlSolver({
                default: 'de',
                locales: {
                    "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test('and return 4 keys', (done) => {
            
            let locales = LocaleUrlSolver.getLocales();
            Code.expect(locales.length).to.equal(4);
            done();
        });

    });

    lab.experiment('have all locales', () => {
        
        lab.before((done) => {

            LocaleUrlSolver({
                default: 'es',
                locales: {
                    "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test('and return 5 keys', (done) => {

            let locales = LocaleUrlSolver.getLocales();
            Code.expect(locales.length).to.equal(5);
            done();
        });
    });

    

    lab.experiment('have less than specified', () => {
        
        lab.before((done) => {

            LocaleUrlSolver({
                default: 'en',
                locales: {
                    de: /^http(s)?:\/\/([a-z]|[:.\-_]|[0-9])*\/de($|\/)/,
                    fr: /^http(s)?:\/\/([a-z]|[:.\-_]|[0-9])*\/fr($|\/)/,
                    en: /^http(s)?:\/\/([a-z]|[:.\-_]|[0-9])*\/en($|\/)/,
                }
            });

            done();
        });

        lab.test('and return 3 keys', (done) => {

            let locales = LocaleUrlSolver.getLocales();
            Code.expect(locales.length).to.equal(3);
            done();
        });
    });

});

module.exports = {
    lab: lab
};