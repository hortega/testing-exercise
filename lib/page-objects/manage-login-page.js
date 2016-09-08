var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

ManageLoginPage = function ManageLoginPage(browser) {
    this.browser = browser;
    this.url = 'http://manage.auth0.com/login';
};

ManageLoginPage.prototype.visit = function() {
    this.browser.get(this.url);
    return webdriver.promise.fulfilled(true);
};

ManageLoginPage.prototype.loginWithGoogle = function(user, pass) {
	var self = this;
    this.browser.wait(until.elementLocated(By.css('.a0-googleplus')), 4000);
    this.browser.findElement(By.css('.a0-googleplus')).click();
    this.browser.findElement(By.name("Email")).sendKeys(user);

    this.browser.findElement(By.name("signIn")).click()
    this.browser.wait(() => {
        return self.browser.findElement(By.id("email-display")).isDisplayed();
    }, 2000);

    this.browser.findElement(By.id("Passwd")).sendKeys(pass);
    
    return this.browser.findElement(By.id("signIn")).click()

};

module.exports = ManageLoginPage;
