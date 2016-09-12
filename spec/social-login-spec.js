import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import util from 'util'


import ManageSocialConnectionsPage from '../lib/page-objects/manage-social-connections-page';
import ManageLoginPage from '../lib/page-objects/manage-login-page';
import GoogleConsentPage from '../lib/page-objects/google/google-consent-page';
import FacebookLoginPage from '../lib/page-objects/facebook/facebook-login-page';
import FacebookApplicationsPage from '../lib/page-objects/facebook/facebook-applications-page';
import FacebookConsentPage from '../lib/page-objects/facebook/facebook-consent-page';
import GithubLoginPage from '../lib/page-objects/github/github-login-page';
import GithubConsentPage from '../lib/page-objects/github/github-consent-page';
import GithubApplicationsPage from '../lib/page-objects/github/github-applications-page';
import CallbackPage from '../lib/page-objects/callback-page';
import extractDebugAssets from '../lib/debug-assets-extractor';
import ChromeBrowserFactory from '../lib/chrome-browser-factory';
import FacebookGraphClient from '../lib/facebook-graph-client';

const mochaTimeOut = 40000; //ms

let browser;
let manageLoginPage;
let googleConsentPage;
let manageSocialConnectionsPage;
let callbackPage;
let facebookLoginPage;
let facebookApplicationsPage;
let facebookConsentPage;
let githubLoginPage;
let githubConsentPage;
let githubApplicationsPage;
let facebookGraphClient;

test.beforeEach(function(done) {
    browser = ChromeBrowserFactory.build();

    manageLoginPage = new ManageLoginPage(browser);
    googleConsentPage = new GoogleConsentPage(browser);
    manageSocialConnectionsPage = new ManageSocialConnectionsPage(browser);
    callbackPage = new CallbackPage(browser);
    facebookLoginPage = new FacebookLoginPage(browser);
    facebookApplicationsPage = new FacebookApplicationsPage(browser);
    facebookConsentPage = new FacebookConsentPage(browser);
    githubLoginPage = new GithubLoginPage(browser);
    githubConsentPage = new GithubConsentPage(browser);
    githubApplicationsPage = new GithubApplicationsPage(browser);
    facebookGraphClient = new FacebookGraphClient();

    done();
});

test.afterEach(function(done) {
    if (this.currentTest.state === 'failed') {
        extractDebugAssets(browser, this.currentTest.title).then(() => browser.quit().then(done));
    } else {
        done();
    }
});

function switchToNewTab() {
    var d = webdriver.promise.defer();
    browser.sleep(1000);
    browser.getAllWindowHandles().then((handles) => {
        var newTab = handles[1];
        browser.switchTo().window(newTab).then(() => {
            d.fulfill();
        });

    });

    return d.promise;
}


describe('Google login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Hit Allow in Google consent page -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        manageLoginPage.visit();
        manageLoginPage.loginWithGoogle();

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

    test.it('should log in to Manage Console -> Hit Try button -> Login on Facebook -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);
        facebookGraphClient.revoke()

        manageLoginPage.visit();
        manageLoginPage.loginWithGoogle();

        manageSocialConnectionsPage.visit();
        manageSocialConnectionsPage.tryFacebook();

        switchToNewTab();
        facebookLoginPage.login();
        facebookConsentPage.consent();

        callbackPage.getHeaderTitle().then((title) => {
            assert.equal(title, 'It Works!', "Expected callback page title: 'It works!', but got " + title);
            browser.quit().then(done);
        });
    });
});

describe('Github login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Login on Github -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        githubLoginPage.visit();
        githubLoginPage.login();
        githubApplicationsPage.visit();
        githubApplicationsPage.revokeApplication("test-exercise");

        manageLoginPage.visit();
        manageLoginPage.loginWithGoogle();

        manageSocialConnectionsPage.visit();
        manageSocialConnectionsPage.tryGithub();

        switchToNewTab();
        githubConsentPage.consent();

        callbackPage.getHeaderTitle().then((title) => {
            assert.equal(title, 'It Works!', "Expected callback page title: 'It works!', but got " + title);
            browser.quit().then(done);
        });
    });
});
