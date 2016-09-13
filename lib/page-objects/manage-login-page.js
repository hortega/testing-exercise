import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import Configuration from '../configuration';
import PageObject from './page-object';
import GoogleLoginPage from './google/google-login-page';

const url = 'http://manage.auth0.com/login';
export default class ManageLoginPage extends PageObject {
    constructor(browser) {
        super(browser, url, {type: "id", selector: "a0-lock"});
        this.credentials = new Configuration();
    }
    clickLoginWithGoogle() {
    	this.browser.wait(until.elementLocated(By.css('.a0-googleplus')), 4000)
        this.browser.findElement(By.css('.a0-googleplus')).click();
        return new GoogleLoginPage(this.browser);
    }
    static build(browser) {
    	return new ManageLoginPage(browser);
    }
    static getUrl() {
    	return url;
    }
}
