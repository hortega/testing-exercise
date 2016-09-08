var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

FacebookLoginPage = function FacebookLoginPage(browser) {
    this.browser = browser;
};



FacebookLoginPage.prototype.login = function(user, password) {
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


module.exports = FacebookLoginPage;
