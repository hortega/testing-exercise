var webdriver = require('selenium-webdriver');
var logging = webdriver.logging
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));


var toCamelCase = function(sentenceCase) {
    var out = "";
    sentenceCase.split(" ").forEach((el, idx) => {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
}

var writeScreenshot = function(data, name) {
    var screenshotPath = '/tmp/';
    var fullPath = screenshotPath + toCamelCase(name) + ".png";
    return fs.writeFile(fullPath, data, 'base64');
};

var writeConsoleLog = function(data, name) {
    var screenshotPath = '/tmp/';
    var fullPath = screenshotPath + toCamelCase(name) + ".log";
    return fs.writeFile(fullPath, data);
};

var extractAssets = function(browser, title) {
    var writeScreenshotPromise = browser.takeScreenshot().then((data) => {
        return writeScreenshot(data, title);
    });
    var writeConsoleLogPromise = browser.manage().logs().get(logging.Type.BROWSER).then((entries) => {
        if (entries && entries.length > 0) {
            var content = entries.map((entry) => entry.message).join('\n')
            console.log("entries" + util.inspect(entries))
            return writeConsoleLog(content, title)
        }
        return new Promise((resolve) => {
            resolve();
        });
    });
    return Promise.join(writeScreenshotPromise, writeConsoleLogPromise);
};


module.exports = extractAssets;
