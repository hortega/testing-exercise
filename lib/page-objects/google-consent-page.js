var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

GoogleConsentPage = function GoogleConsentPage(browser) {
    this.browser = browser;
};



GoogleConsentPage.prototype.allow = function() {
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


module.exports = GoogleConsentPage;
