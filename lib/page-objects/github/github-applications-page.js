import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import util from 'util';
import PageObject from '../page-object';



const clickScript = `var aTags = document.getElementsByTagName("button");
                            var searchText = "I understand, revoke access";
                            var found;

                            for (var i = 0; i < aTags.length; i++) {
                              if (aTags[i].textContent == searchText) {
                                alert(aTags[i]);
                                break;
                              }
                            }`
const url = 'https://github.com/settings/applications'
export default class GithubApplicationsPage extends PageObject {

    constructor(browser) {
        super(browser, url);
    }

    revokeApplication(appName) {

        var d = webdriver.promise.defer();

        this.browser.findElements(By.xpath(`//a[text()='${appName}']`)).then((elements) => {
            if (elements.length > 0) {
                elements[0].click().then(() => {
                    return this.browser.findElement(By.xpath("//a[text()='Revoke access']")).click();
                }).then(() => {
                    this.browser.wait(until.elementLocated(By.id("facebox")), 2000);
                    return this.browser.findElements(By.tagName("button"));
                }).then((buttons) => {
                    buttons[3].click();
                }).then(() => d.fulfill());
            } else {
                d.fulfill();
            }
        })


        return d.promise;
    }
    static build(browser) {
        return new GithubApplicationsPage(browser);
    }
    static getUrl() {
        return url;
    }
}
