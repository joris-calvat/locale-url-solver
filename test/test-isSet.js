
var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('isSet method should', () => {
    
    lab.before((done) => {

        LocaleUrlSolver({
            default: 'es',
            locales: {
                "de|fr|en|it": /^http(s)?:\/\/([^\/]*((.LANG)|\/LANG)($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
            }
        });

        done();
    });

    lab.test('not have japan', (done) => {
        
        let isSet = LocaleUrlSolver.isSet('jp');
        Code.expect(isSet).to.equal(false);
        done();
    });

    lab.test('should have spanish', (done) => {
        
        let isSet = LocaleUrlSolver.isSet('es');
        Code.expect(isSet).to.equal(true);
        done();
    });

    lab.test('should have german', (done) => {
        
        let isSet = LocaleUrlSolver.isSet('de');
        Code.expect(isSet).to.equal(true);
        done();
    });
});

module.exports = {
    lab: lab
};