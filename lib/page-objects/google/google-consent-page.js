import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import PageObject from '../page-object';
import CallbackPage from '../callback-page';


export default class GoogleConsentPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://manage.auth0.com/#/connections/social');
    }

    allow() {
        // this.browser.wait(until.elementLocated(By.id("submit_approve_access")), 2000);
        this.browser.wait(() => {
            return this.browser.findElement(By.id("submit_approve_access")).isEnabled();
        }, 2000);
        this.browser.findElement(By.id("submit_approve_access")).click();
        return new CallbackPage(this.browser);
    }
}
