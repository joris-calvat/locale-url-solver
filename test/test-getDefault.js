'use strict';

var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('getDefault method', () => {

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
        
        let locale = LocaleUrlSolver.getDefault();
        Code.expect(locale).to.equal('de');
        done();
    });
});

module.exports = {
    lab: lab
};