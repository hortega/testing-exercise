import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class GithubConsentPage {
    constructor(browser) {
        this.browser = browser;
    }

    consent() {
        return this.browser.findElement(By.name('authorize')).click();
    }

}