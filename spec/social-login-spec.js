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

test.beforeEach(function(done) {
    browser = ChromeBrowserFactory.build();
    done();
});

test.afterEach(function(done) {
    if (this.currentTest.state === 'failed') {
        extractDebugAssets(browser, this.currentTest.title).then(() => browser.quit().then(done));
    } else {
        done();
    }
});

var loginToManageConsole = function() {
    var page = new ManageLoginPage(browser);
    page.visit();
    page = page.clickLoginWithGoogle();
    page.login();
}

var assertCallbackPage = function(page, done) {
    page.getHeaderTitle().then((title) => {
        assert.equal(title, 'It Works!', "Expected callback page title: 'It works!', but got " + title);
        browser.quit().then(done);
    });
}


describe('Google login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Hit Allow in Google consent page -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        loginToManageConsole();

        var page = new ManageSocialConnectionsPage(browser);
        page.visit();
        page = page.tryGoogle()

        page.switchToNewTab();
        page = page.allow();

        assertCallbackPage(page, done);
    });
});

describe('Facebook login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Login on Facebook -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        let facebookGraphClient = new FacebookGraphClient();
        facebookGraphClient.revoke()

        loginToManageConsole();

        var page = new ManageSocialConnectionsPage(browser);
        page.visit();
        page = page.tryFacebook()

        page.switchToNewTab();
        page = page.login();
        page = page.consent();

        assertCallbackPage(page, done);
    });
});

describe('Github login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Login on Github -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        var page = new GithubLoginPage(browser);
        page.visit();
        page = page.login();

        page = new GithubApplicationsPage(browser);
        page.visit();
        page.revokeApplication("test-exercise");

        loginToManageConsole();

        var page = new ManageSocialConnectionsPage(browser);
        page.visit();
        page = page.tryGithub()

        page.switchToNewTab();
        page = page.consent();

        assertCallbackPage(page, done);
    });
});
