import webdriver from 'selenium-webdriver';
import {until, By} from 'selenium-webdriver';
import PageObject from './page-object';
import GoogleConsentPage from './google/google-consent-page';
import GithubConsentPage from './github/github-consent-page';
import FacebookConsentPage from './facebook/facebook-consent-page';



export default class ManageSocialConnectionsPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://manage.auth0.com/#/connections/social');    
    }
    tryTemplate(divId) {
        var xpath = `//div[@id='${divId}']/div[@class='switch-indicators']/a`
        this.browser.wait(() => {
            return this.browser.findElement(By.id("social-connections-accordion")).isDisplayed();
        }, 4000);
        return this.browser.findElement(By.xpath(xpath)).click();
    }

    tryGoogle() {
        this.tryTemplate("google-oauth2-conn");
        return new GoogleConsentPage(this.browser);
    }

    tryFacebook() {
        return this.tryTemplate("facebook-conn");
    }

    tryGithub() {
        return this.tryTemplate("github-conn");
    }
}

