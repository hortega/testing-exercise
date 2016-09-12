import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import Configuration from '../../configuration';

export default class FacebookLoginPage {
    constructor(browser) {
        this.browser = browser;
        this.url = "https://www.facebook.com/login.php"
        this.credentials = new Configuration()
    }

    visit() {
        this.browser.get(this.url);
    }

    login() {
        var d = webdriver.promise.defer();

        this.browser.findElement(By.id("email")).sendKeys(this.credentials.user);
        this.browser.findElement(By.id("pass")).sendKeys(this.credentials.password);

        return this.browser.findElement(By.id("loginbutton")).click().then(() => {
            d.fulfill();
        });

        return d.promise;

    }
}
