import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import PageObject from './page-object';

const url = 'https://manage.auth0.com/tester/callback';
export default class CallbackPage extends PageObject {
    constructor(browser) {
        super(browser, url);
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
