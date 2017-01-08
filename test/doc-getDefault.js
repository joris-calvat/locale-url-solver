'use strict';

var Lab = require('lab');
var lab = Lab.script();

const Code = require("code");
const LocaleUrlSolver = require("..");

lab.experiment('getDefault part', () => {

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

        lab.test("should return default locale 'en'", (done) => {
            
            let locale = LocaleUrlSolver.getDefault();
            Code.expect(locale).to.equal('en');
            done();
        });
    });

    lab.experiment('with unset default locale', () => {

        lab.before((done) => {

            LocaleUrlSolver({
                locales: {
                    'fr': /^http(s)?:\/\/fr\.[^\/]+($|\/)(.*)$/,
                    'de|es': /^http(s)?:\/\/([^\/]*\/LANG($|\/)|LANG\.[^\/]+($|\/)(.*)$)/
                }
            });

            done();
        });

        lab.test("should return default locale 'fr'", (done) => {
            
            let locale = LocaleUrlSolver.getDefault();
            Code.expect(locale).to.equal('fr');
            done();
        });
    });

});


module.exports = {
    lab: lab
};