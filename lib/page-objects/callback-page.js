var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

CallbackPage = function CallbackPage(browser) {
    this.browser = browser;
    this.bodyTitle = "It Works!";
};



CallbackPage.prototype.getHeaderTitle = function() {
    var d = webdriver.promise.defer();

    this.browser.wait(until.elementLocated(By.css(".error-title")), 2000);
    this.browser.findElement(By.css(".error-title")).getText().then((title) => {
        d.fulfill(title);
    });
    return d.promise;

}


module.exports = CallbackPage;
