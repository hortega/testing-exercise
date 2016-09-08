var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

GoogleConsentPage = function GoogleConsentPage(browser) {
    this.browser = browser;
};



GoogleConsentPage.prototype.allow = function() {
    var d = webdriver.promise.defer();

    var self = this;
    this.browser.sleep(1500);
    this.browser.getAllWindowHandles().then(function(handles) {
        // console.log("handles " + handles)
        var handle = handles[1];
        self.browser.switchTo().window(handle);
        self.browser.wait(until.elementLocated(By.id("submit_approve_access")), 2000);

        self.browser.wait(() => {
            return self.browser.findElement(By.id("submit_approve_access")).isEnabled();
        }, 2000);
        self.browser.findElement(By.id("submit_approve_access")).click().then(() => {
            d.fulfill();
        });


    });
    return d.promise;

}


module.exports = GoogleConsentPage;
