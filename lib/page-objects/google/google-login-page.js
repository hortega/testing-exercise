import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import Configuration from '../../configuration';
import PageObject from '../page-object';
import ManageSocialConnectionsPage from '../manage-social-connections-page';

export default class GoogleLoginPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://accounts.google.com/ServiceLogin');
        this.credentials = new Configuration();
    }
    login() {
        this.browser.findElement(By.name("Email")).sendKeys(this.credentials.user);
        this.browser.findElement(By.name("signIn")).click()
        this.browser.wait(() => {
            return this.browser.findElement(By.id("email-display")).isDisplayed();
        }, 2000);
        this.browser.findElement(By.id("Passwd")).sendKeys(this.credentials.password);
        return this.browser.findElement(By.id("signIn")).click();        
    }
}
