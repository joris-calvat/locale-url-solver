'use strict';

const Lab = require("lab");
const Code = require("code");
const LocaleUrlSolver = require("..");

LocaleUrlSolver({
    default: 'de',
    locales: {
        de: /^http(s)*:\/\/((www|beta|pre).website\.com\/de\/|(beta\.|pre\.)*de\.)/,
        fr: /^http(s)*:\/\/((www|beta|pre).website\.com\/fr\/|(beta\.|pre\.)*fr\.)/,
        it: /^http(s)*:\/\/((www|beta|pre).website\.com\/en\/|(beta\.|pre\.)*en\.)/,
        en: /^http(s)*:\/\/((www|beta|pre).website\.com\/it\/|(beta\.|pre\.)*it\.)/
    }
});

Lab.experiment('LocaleUrlSolver', () => {

    Lab.test('it should get default locale', (done) => {
        
        let locale = LocaleUrlSolver.solve('something');

        Code.expect(statusCode).to.equal('de');

        done();
    });
});