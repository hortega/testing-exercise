import webdriver from 'selenium-webdriver';
import {until, By} from 'selenium-webdriver';

export default class GoogleConsentPage {
    constructor(browser) {
        this.browser = browser;
    }

    allow() {
        var d = webdriver.promise.defer();

        this.browser.sleep(1500);
        this.browser.getAllWindowHandles().then((handles) => {
            var handle = handles[1];
            this.browser.switchTo().window(handle);
            this.browser.wait(until.elementLocated(By.id("submit_approve_access")), 2000);

            this.browser.wait(() => {
                return this.browser.findElement(By.id("submit_approve_access")).isEnabled();
            }, 2000);
            this.browser.findElement(By.id("submit_approve_access")).click().then(() => {
                d.fulfill();
            });


        });
        return d.promise;

    }
}
