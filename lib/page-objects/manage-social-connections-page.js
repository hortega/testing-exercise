var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

ManageSocialConnectionsPage = function ManageSocialConnectionsPage(browser) {
    this.browser = browser;
    this.url = 'https://manage.auth0.com/#/connections/social';
};

ManageSocialConnectionsPage.prototype.visit = function() {
    this.browser.get(this.url);
    return webdriver.promise.fulfilled(true);
};

ManageSocialConnectionsPage.prototype.tryGoogle = function() {
    var d = webdriver.promise.defer();
    var self = this;
    var xpath = "//div[@id='google-oauth2-conn']/div[@class='switch-indicators']/a"
    // this.browser.wait(until.elementLocated(By.id("social-connections-accordion")), 2000);
    this.browser.wait(() => {
        return self.browser.findElement(By.id("social-connections-accordion")).isDisplayed();
    }, 4000);
    this.browser.findElement(By.xpath(xpath)).click().then(function(){
        d.fulfill();
    });
    return d.promise;
}


module.exports = ManageSocialConnectionsPage;
