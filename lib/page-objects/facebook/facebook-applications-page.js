import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';

export default class FacebookApplicationsPage {
    constructor(browser) {
        this.browser = browser;
        this.url = "https://www.facebook.com/settings?tab=applications"
    }

    visit() {
        this.browser.get(this.url);
    }

    revoke(appName) {
        var d = webdriver.promise.defer();

        this.browser.sleep(1000)

        this.browser.findElement(By.xpath("//div[text()='testing-exercise']")).click();

        return d.promise;

    }
}
