var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

GithubLoginPage = function GithubLoginPage(browser) {
    this.browser = browser;
};



GithubLoginPage.prototype.login = function(user, password) {
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


module.exports = GithubLoginPage;
