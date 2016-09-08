var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

ManageSocialConnectionsPage = function ManageSocialConnectionsPage(browser) {
    this.browser = browser;
    this.url = 'https://manage.auth0.com/#/connections/social';
};

ManageSocialConnectionsPage.prototype.tryTemplate = function(divId) {
    var xpath = `//div[@id='${divId}']/div[@class='switch-indicators']/a`
    this.browser.wait(() => {
        return this.browser.findElement(By.id("social-connections-accordion")).isDisplayed();
    }, 4000);
    return this.browser.findElement(By.xpath(xpath)).click();
}

ManageSocialConnectionsPage.prototype.visit = function() {
    this.browser.get(this.url);
    return webdriver.promise.fulfilled(true);
};

ManageSocialConnectionsPage.prototype.tryGoogle = function() {
    return this.tryTemplate("google-oauth2-conn");
}

ManageSocialConnectionsPage.prototype.tryFacebook = function() {
    return this.tryTemplate("facebook-conn");
}

ManageSocialConnectionsPage.prototype.tryGithub = function() {
    return this.tryTemplate("github-conn");
}


module.exports = ManageSocialConnectionsPage;
