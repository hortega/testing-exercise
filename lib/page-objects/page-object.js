import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class PageObject {
    constructor(browser, url, at) {
        this.browser = browser;
        this.url = url;
        this.at = at;
        this.checkAt();
    }
    visit() {
        this.browser.get(this.url);
        return this.checkAt();
    }

    checkAt() {
        let selector;
        if (this.at) {
            if(this.at.type === 'title') {
                this.browser.sleep(500);
                this.browser.getTitle().then((title) => {
                    if(title !== this.at.selector) {
                        let msg = `Expected title in ${this.url} is ${this.at.selector} but was ${title}`
                        console.log(msg)
                        throw new Error(msg);
                    }
                });
            }
            switch (this.at.type) {
                case "css":
                    selector = By.css(this.at.selector);
                    break;
                case "id":
                    selector = By.id(this.at.selector);
                    break;
                case "xpath":
                    selector = By.xpath(this.at.selector);
                    break;
            }
            if (selector) {
                return this.browser.findElement(selector);
            } else {
                return new webdriver.promise.fulfilled();
            }
        }
    }

    static build(browser){}

    static getUrl() {}

    static navigateTo(browser) {
        browser.get(this.getUrl());
        return this.build(browser);
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
