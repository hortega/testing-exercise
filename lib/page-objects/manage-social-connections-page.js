import webdriver from 'selenium-webdriver';
import {until, By} from 'selenium-webdriver';
import PageObject from './page-object';
import GoogleConsentPage from './google/google-consent-page';
import GithubConsentPage from './github/github-consent-page';
import FacebookLoginPage from './facebook/facebook-login-page';



export default class ManageSocialConnectionsPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://manage.auth0.com/#/connections/social');    
    }
    tryTemplate(divId) {
        var xpath = `//div[@id='${divId}']/div[@class='switch-indicators']/a`
        this.browser.wait(() => {
            return this.browser.findElement(By.id("social-connections-accordion")).isDisplayed();
        }, 6000);
        return this.browser.findElement(By.xpath(xpath)).click();
    }

    tryGoogle() {
        this.tryTemplate("google-oauth2-conn");
        return new GoogleConsentPage(this.browser);
    }

    tryFacebook() {
        this.tryTemplate("facebook-conn");
        return new FacebookLoginPage(this.browser);
    }

    tryGithub() {
        this.tryTemplate("github-conn");
        return new GithubConsentPage(this.browser);
    }
}

