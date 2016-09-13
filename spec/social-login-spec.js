import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import util from 'util'

import ManageSocialConnectionsPage from '../lib/page-objects/manage-social-connections-page';
import ManageLoginPage from '../lib/page-objects/manage-login-page';
import GithubLoginPage from '../lib/page-objects/github/github-login-page';
import GithubApplicationsPage from '../lib/page-objects/github/github-applications-page';
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
    var page = ManageLoginPage.navigateTo(browser)
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
        // given: I login to the manage console
        loginToManageConsole();

        // when: I click try Google social login
        var page = ManageSocialConnectionsPage.navigateTo(browser);
        page = page.tryGoogle();

        // and: allow my app to use Google
        page = page.allow();

        // then: I'm redirected to the success callback page
        assertCallbackPage(page, done);
    });
});

describe('Facebook login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Login on Facebook -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        // given: I revoke any previous authorization Facebook may have on my app
        let facebookGraphClient = new FacebookGraphClient();
        facebookGraphClient.revoke()

        // and: I login to the manage console
        loginToManageConsole();

        // when: I click try Facebook social login
        let page = ManageSocialConnectionsPage.navigateTo(browser);
        page = page.tryFacebook()

        // and: allow my app to use Facebook
        page = page.login();
        page = page.consent();

        // then: I'm redirected to the success callback page
        assertCallbackPage(page, done);
    });
});

describe('Github login', function() {

    test.it('should log in to Manage Console -> Hit Try button -> Login on Github -> Callback page is displayed', function(done) {
        this.timeout(mochaTimeOut);

        // given: I revoke any previous authorization Github may have on my app
        let page = GithubLoginPage.navigateTo(browser);
        page = page.login();
        page = GithubApplicationsPage.navigateTo(browser);
        page.revokeApplication("test-exercise");

        // and: I login to the manage console
        loginToManageConsole();

        // when: I click try Github social login
        page = ManageSocialConnectionsPage.navigateTo(browser);
        page = page.tryGithub()

        // and: allow my app to use Github
        page = page.consent();

        // then: I'm redirected to the success callback page
        assertCallbackPage(page, done);
    });
});
