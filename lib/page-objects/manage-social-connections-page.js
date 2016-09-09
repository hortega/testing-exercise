import webdriver from 'selenium-webdriver';
import {until, By} from 'selenium-webdriver';

export default class ManageSocialConnectionsPage {
    constructor(browser) {
        this.browser = browser;
        this.url = 'https://manage.auth0.com/#/connections/social';
    }
    tryTemplate(divId) {
        var xpath = `//div[@id='${divId}']/div[@class='switch-indicators']/a`
        this.browser.wait(() => {
            return this.browser.findElement(By.id("social-connections-accordiona")).isDisplayed();
        }, 4000);
        return this.browser.findElement(By.xpath(xpath)).click();
    }

    visit() {
        this.browser.get(this.url);
        return webdriver.promise.fulfilled(true);
    };

    tryGoogle() {
        return this.tryTemplate("google-oauth2-conn");
    }

    tryFacebook() {
        return this.tryTemplate("facebook-conn");
    }

    tryGithub() {
        return this.tryTemplate("github-conn");
    }
}

