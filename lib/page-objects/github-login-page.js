import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class GithubLoginPage {
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
            this.browser.findElement(By.id("login_field")).sendKeys(user);
            this.browser.findElement(By.id("password")).sendKeys(password);

            return this.browser.findElement(By.name("commit")).click().then(() => {
                d.fulfill();
            });

        });


        return d.promise;

    }

}