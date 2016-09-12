import webdriver from 'selenium-webdriver';
import {until, By} from 'selenium-webdriver';
import Configuration from '../configuration';
import PageObject from './page-object';
import GoogleLoginPage from './google/google-login-page';

export default class ManageLoginPage extends PageObject{
    constructor(browser) {
        super(browser, 'http://manage.auth0.com/login');
        this.credentials = new Configuration();
    }
    clickLoginWithGoogle() {
        this.browser.wait(until.elementLocated(By.css('.a0-googleplus')), 4000);
        this.browser.findElement(By.css('.a0-googleplus')).click();
        return new GoogleLoginPage(this.browser);
    }
}
