import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class PageObject {
    constructor(browser, url, at) {
        this.browser = browser;
        this.url = url;
        if (at) {
            this.browser.findElement(at);
        }
    }
    visit() {
        return this.browser.get(this.url);
    }

    switchToNewTab() {
        var d = webdriver.promise.defer();
        this.browser.sleep(1000);
        this.browser.getAllWindowHandles().then((handles) => {
            var newTab = handles[1];
            this.browser.switchTo().window(newTab).then(() => {
                d.fulfill();
            });

        });
        return d.promise;
    }

}
