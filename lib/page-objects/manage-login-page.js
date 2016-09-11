import webdriver from 'selenium-webdriver';
import {until, By} from 'selenium-webdriver';

export default class ManageLoginPage {
    constructor(browser) {
        this.browser = browser;
        this.url = 'http://manage.auth0.com/login';
    }
    visit() {
        this.browser.get(this.url);
        return webdriver.promise.fulfilled(true);
    }
    loginWithGoogle(credentials) {
        this.browser.wait(until.elementLocated(By.css('.a0-googleplus')), 4000);
        this.browser.findElement(By.css('.a0-googleplus')).click();
        this.browser.findElement(By.name("Email")).sendKeys(credentials.user);

        this.browser.findElement(By.name("signIn")).click()
        this.browser.wait(() => {
            return this.browser.findElement(By.id("email-display")).isDisplayed();
        }, 2000);

        this.browser.findElement(By.id("Passwd")).sendKeys(credentials.password);

        return this.browser.findElement(By.id("signIn")).click()
    }
}
