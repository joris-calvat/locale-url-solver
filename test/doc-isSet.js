
var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('isSet part', () => {

    lab.experiment('with mixed patterns', () => {

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

        lab.test("should return true for default locale 'en'", (done) => {
            
            let isSet = LocaleUrlSolver.isSet('en');
            Code.expect(isSet).to.equal(true);
            done();
        });

        lab.test("should return true for default locale 'fr'", (done) => {
            
            let isSet = LocaleUrlSolver.isSet('fr');
            Code.expect(isSet).to.equal(true);
            done();
        });

        lab.test("should return true for default locale 'de'", (done) => {
            
            let isSet = LocaleUrlSolver.isSet('de');
            Code.expect(isSet).to.equal(true);
            done();
        });

        lab.test("should return false for default locale 'jp'", (done) => {
            
            let isSet = LocaleUrlSolver.isSet('jp');
            Code.expect(isSet).to.equal(false);
            done();
        });
    });

});


module.exports = {
    lab: lab
};