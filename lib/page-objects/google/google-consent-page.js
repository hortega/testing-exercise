import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import PageObject from '../page-object';
import CallbackPage from '../callback-page';


export default class GoogleConsentPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://accounts.google.com/o/oauth2/auth',  {type: "title", selector: "Request for Permission"});
    }

    allow() {
        this.browser.wait(() => {
            return this.browser.findElement(By.id("submit_approve_access")).isEnabled();
        }, 2000);
        this.browser.findElement(By.id("submit_approve_access")).click();
        return new CallbackPage(this.browser);
    }
}
