import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import PageObject from './page-object';
import GoogleConsentPage from './google/google-consent-page';
import GithubConsentPage from './github/github-consent-page';
import FacebookLoginPage from './facebook/facebook-login-page';


const url = 'https://manage.auth0.com/#/connections/social';
export default class ManageSocialConnectionsPage extends PageObject {
    constructor(browser) {
        super(browser, url, {type: "title", selector: "Social Connections"});
    }
    tryTemplate(divId) {
        this.browser.wait(() => {
            return this.browser.findElement(By.id("social-connections-accordion")).isDisplayed();
        }, 6000);
        var xpath = `//div[@id='${divId}']/div[@class='switch-indicators']/a`
        return this.browser.findElement(By.xpath(xpath)).click();
    }

    tryGoogle() {
        this.tryTemplate("google-oauth2-conn");
        this.switchToNewTab();
        return new GoogleConsentPage(this.browser);
    }

    tryFacebook() {
        this.tryTemplate("facebook-conn");
        this.switchToNewTab();
        return new FacebookLoginPage(this.browser);
    }

    tryGithub() {
        this.tryTemplate("github-conn");
        this.switchToNewTab();
        return new GithubConsentPage(this.browser);
    }
    static build(browser) {
        return new ManageSocialConnectionsPage(browser);
    }
    static getUrl() {
        return url;
    }
}
