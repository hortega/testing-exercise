import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class GithubLoginPage {
    constructor(browser) {
        this.browser = browser;
        this.url = "https://github.com/login"
    }

    visit() {
        this.browser.get(this.url);
    }


    login(user, password) {
        var d = webdriver.promise.defer();

        this.browser.findElement(By.id("login_field")).sendKeys(user);
        this.browser.findElement(By.id("password")).sendKeys(password);

        return this.browser.findElement(By.name("commit")).click().then(() => {
            d.fulfill();
        });

        return d.promise;

    }

}
