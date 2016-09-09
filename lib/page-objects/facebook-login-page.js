import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class FacebookLoginPage {
    constructor(browser) {
        this.browser = browser;
    }

    login(user, password) {
        var d = webdriver.promise.defer();

        this.browser.sleep(1500);
        this.browser.getAllWindowHandles().then((handles) => {
            console.log("handles" + handles)
            var handle = handles[1];
            this.browser.switchTo().window(handle);
            this.browser.findElement(By.id("email")).sendKeys(user);
            this.browser.findElement(By.id("pass")).sendKeys(password);

            return this.browser.findElement(By.id("loginbutton")).click().then(() => {
                d.fulfill();
            });

        });

        return d.promise;

    }
}
