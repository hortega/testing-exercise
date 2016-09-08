let webdriver = require('selenium-webdriver');
let logging = webdriver.logging
let test = require('selenium-webdriver/testing');
let Capabilities = webdriver.Capabilities;
let util = require('util')
let assert = require('assert');

let PropertiesReader = require('properties-reader');
let ManageLoginPage = require('../lib/page-objects/manage-login-page');
let ManageSocialConnectionsPage = require('../lib/page-objects/manage-social-connections-page');
let GoogleConsentPage = require('../lib/page-objects/google-consent-page');
let FacebookLoginPage = require('../lib/page-objects/facebook-login-page');
let GithubLoginPage = require('../lib/page-objects/github-login-page');
let GithubConsentPage = require('../lib/page-objects/github-consent-page');
let CallbackPage = require('../lib/page-objects/callback-page');
let debugAssetsExtractor = require('../lib/debug-assets-extractor');

const mochaTimeOut = 40000; //ms

let homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
let properties = PropertiesReader(homeDir + '/testing-exercise.properties');

describe('Google login', function() {

    let browser;
    let manageLoginPage;
    let googleConsentPage;
    let manageSocialConnectionsPage;
    let callbackPage;



    test.beforeEach(function(done) {
        let prefs = new logging.Preferences();
        prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

        let caps = Capabilities.chrome();
        caps.setLoggingPrefs(prefs);
        browser = new webdriver.Builder().withCapabilities(caps).build();

        manageLoginPage = new ManageLoginPage(browser);
        googleConsentPage = new GoogleConsentPage(browser);
        manageSocialConnectionsPage = new ManageSocialConnectionsPage(browser);
        callbackPage = new CallbackPage(browser);

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

describe('Facebook login', function() {

    let browser;
    let manageLoginPage;
    let googleConsentPage;
    let manageSocialConnectionsPage;
    let callbackPage;

    test.beforeEach(function(done) {
        let prefs = new logging.Preferences();
        prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

        let caps = Capabilities.chrome();
        caps.setLoggingPrefs(prefs);
        browser = new webdriver.Builder().withCapabilities(caps).build();

        manageLoginPage = new ManageLoginPage(browser);
        facebookLoginPage = new FacebookLoginPage(browser);
        manageSocialConnectionsPage = new ManageSocialConnectionsPage(browser);
        callbackPage = new CallbackPage(browser);

        done();
    });

    test.afterEach(function(done) {
        if (this.currentTest.state === 'failed') {
            debugAssetsExtractor(browser, this.currentTest.title).then(() => browser.quit().then(done));
        } else {
            done();
        }
    });

    test.it('log in to Manage Console -> Hit Try button -> Login on Facebook -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        manageLoginPage.visit();
        manageLoginPage.loginWithGoogle(properties.get("manage.user"), properties.get("manage.password"));

        manageSocialConnectionsPage.visit();
        manageSocialConnectionsPage.tryFacebook()

        facebookLoginPage.login(properties.get("facebook.user"), properties.get("facebook.password"));

        callbackPage.getHeaderTitle().then((title) => {
            assert.equal(title, 'It Works!', "Expected callback page title: 'It works!', but got " + title);
            browser.quit().then(done);
        });
    });
});

describe('Github login', function() {

    let browser;
    let manageLoginPage;
    let googleConsentPage;
    let manageSocialConnectionsPage;
    let callbackPage;

    test.beforeEach(function(done) {
        let prefs = new logging.Preferences();
        prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

        let caps = Capabilities.chrome();
        caps.setLoggingPrefs(prefs);
        browser = new webdriver.Builder().withCapabilities(caps).build();

        manageLoginPage = new ManageLoginPage(browser);
        githubLoginPage = new GithubLoginPage(browser);
        githubConsentPage = new GithubConsentPage(browser);
        manageSocialConnectionsPage = new ManageSocialConnectionsPage(browser);
        callbackPage = new CallbackPage(browser);

        done();
    });

    test.afterEach(function(done) {
        if (this.currentTest.state === 'failed') {
            debugAssetsExtractor(browser, this.currentTest.title).then(() => browser.quit().then(done));
        } else {
            done();
        }
    });

    test.it('log in to Manage Console -> Hit Try button -> Login on Facebook -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        manageLoginPage.visit();
        manageLoginPage.loginWithGoogle(properties.get("manage.user"), properties.get("manage.password"));

        manageSocialConnectionsPage.visit();
        manageSocialConnectionsPage.tryGithub()

        githubLoginPage.login(properties.get("github.user"), properties.get("github.password"));

        callbackPage.getHeaderTitle().then((title) => {
            assert.equal(title, 'It Works!', "Expected callback page title: 'It works!', but got " + title);
            browser.quit().then(done);
        });
    });
});
