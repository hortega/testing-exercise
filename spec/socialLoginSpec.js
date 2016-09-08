var webdriver = require('selenium-webdriver');
var logging = webdriver.logging
var test = require('selenium-webdriver/testing');
var By = webdriver.By;
var Capabilities = webdriver.Capabilities;
var util = require('util')
var assert = require('assert');
var until = webdriver.until;

var PropertiesReader = require('properties-reader');
var ManageLoginPage = require('../lib/page-objects/manage-login-page');
var ManageSocialConnectionsPage = require('../lib/page-objects/manage-social-connections-page');
var GoogleConsentPage = require('../lib/page-objects/google-consent-page');
var CallbackPage = require('../lib/page-objects/callback-page');
var debugAssetsExtractor = require('../lib/debug-assets-extractor');

const mochaTimeOut = 40000; //ms

describe('Google login', function() {

    let browser;
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var properties = PropertiesReader(homeDir + '/testing-exercise.properties');
   

    test.beforeEach(function(done) {
        var prefs = new logging.Preferences();
        prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

        var caps = Capabilities.chrome();
        caps.setLoggingPrefs(prefs);
        browser = new webdriver.Builder().withCapabilities(caps).build();
        done();
    });

    test.afterEach(function(done) {
        if (this.currentTest.state === 'failed') {
            debugAssetsExtractor(browser, this.currentTest.title).then(() => browser.quit().then(done));
        } else {
            done();
        }
    });

    test.it('log in to Manage Console -> Hit Try button -> Hit Allow in Google consent page -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);
        var manageLoginPage = new ManageLoginPage(browser);
        var googleConsentPage = new GoogleConsentPage(browser);
        var manageSocialConnectionsPage = new ManageSocialConnectionsPage(browser);
        var callbackPage = new CallbackPage(browser);

        manageLoginPage.visit();
        manageLoginPage.loginWithGoogle(properties.get("manage.user"), properties.get("manage.password"));

        manageSocialConnectionsPage.visit();
        manageSocialConnectionsPage.tryGoogle()
        googleConsentPage.allow();
        callbackPage.getHeaderTitle().then((title) => {
            assert.equal(title, 'It Works!', "Expected callback page title: 'It works!', but got " + title);
            browser.quit().then(done);
        });

    });


});
