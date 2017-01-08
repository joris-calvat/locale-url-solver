'use strict';

var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('getLocales part', () => {

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

        lab.test('should return 4 keys', (done) => {
            
            let locales = LocaleUrlSolver.getLocales();
            Code.expect(locales.length).to.equal(4);
            done();
        });
    });

});


module.exports = {
    lab: lab
};