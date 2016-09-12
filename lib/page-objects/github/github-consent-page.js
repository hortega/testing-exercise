import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import PageObject from '../page-object';
import CallbackPage from  '../callback-page';


export default class GithubConsentPage extends PageObject{
    constructor(browser) {
        super(browser, 'https://github.com/login/oauth/authorize');
    }

    consent() {
        this.browser.findElement(By.name('authorize')).click();
        return new CallbackPage(this.browser);
    }

}