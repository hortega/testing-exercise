import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class FacebookLoginPage {
    constructor(browser) {
        this.browser = browser;
        this.url = "https://www.facebook.com/login.php"
    }

    visit() {
        this.browser.get(this.url);
    }

    login(user, password) {
        var d = webdriver.promise.defer();

        this.browser.findElement(By.id("email")).sendKeys(user);
        this.browser.findElement(By.id("pass")).sendKeys(password);

        return this.browser.findElement(By.id("loginbutton")).click().then(() => {
            d.fulfill();
        });

        return d.promise;

    }
}
