import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import Configuration from '../../configuration';
import PageObject from '../page-object';
import FacebookConsentPage from './facebook-consent-page';


export default class FacebookLoginPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://www.facebook.com/login.php');
        this.credentials = new Configuration()
    }

    login() {
        this.browser.findElement(By.id("email")).sendKeys(this.credentials.user);
        this.browser.findElement(By.id("pass")).sendKeys(this.credentials.password);
        this.browser.findElement(By.id("loginbutton")).click()
        return new FacebookConsentPage(this.browser);
    }
}
