import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class CallbackPage {
    constructor(browser) {
        this.browser = browser;
        this.bodyTitle = "It Works!";
    }

    getHeaderTitle() {
        var d = webdriver.promise.defer();

        this.browser.wait(until.elementLocated(By.css(".error-title")), 10000);
        this.browser.findElement(By.css(".error-title")).getText().then((title) => {
            d.fulfill(title);
        });
        return d.promise;

    }
}
