import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import Configuration from '../../configuration';

export default class GithubLoginPage {
    constructor(browser) {
        this.browser = browser;
        this.url = "https://github.com/login"
        this.credentials = new Configuration();
    }

    visit() {
        this.browser.get(this.url);
    }


    login(credentials) {
        var d = webdriver.promise.defer();

        this.browser.findElement(By.id("login_field")).sendKeys(this.credentials.user);
        this.browser.findElement(By.id("password")).sendKeys(this.credentials.password);

        return this.browser.findElement(By.name("commit")).click().then(() => {
            d.fulfill();
        });

        return d.promise;

    }

}
