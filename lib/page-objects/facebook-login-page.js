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

    login(credentials) {
        var d = webdriver.promise.defer();
console.log("credentials" + util.inspect(credentials))
        this.browser.findElement(By.id("email")).sendKeys(credentials.user);
        this.browser.findElement(By.id("pass")).sendKeys(credentials.password);

        return this.browser.findElement(By.id("loginbutton")).click().then(() => {
            d.fulfill();
        });

        return d.promise;

    }
}
