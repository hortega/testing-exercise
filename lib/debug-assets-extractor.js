var webdriver = require('selenium-webdriver');
var logging = webdriver.logging
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var rimraf = require('rimraf');

const logsPath = './logs/'


var toCamelCase = function(sentenceCase) {
    var out = "";
    sentenceCase.split(" ").forEach((el, idx) => {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
}

var writeScreenshot = function(data, name) {
    var fullPath = logsPath + toCamelCase(name) + ".png";
    console.log(`screenshot stored at ${fullPath}`);
    return fs.writeFileAsync(fullPath, data, 'base64');
};

var writeConsoleLog = function(data, name) {
    var fullPath = logsPath + toCamelCase(name) + ".log";
    console.log(`browser logs stored at ${fullPath}`);
    return fs.writeFileAsync(fullPath, data);
};

function createLogsDirIfDoesNotExist() {
    if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath);
    }
}

var extractAssets = function(browser, title) {
    createLogsDirIfDoesNotExist();
    var writeScreenshotPromise = browser.takeScreenshot().then((data) => {
        return writeScreenshot(data, title);
    });
    var writeConsoleLogPromise = browser.manage().logs().get(logging.Type.BROWSER).then((entries) => {
        if (entries && entries.length > 0) {
            var content = entries.map((entry) => entry.message).join('\n')
            return writeConsoleLog(content, title)
        }
        return new webdriver.promise.fulfilled();
    });
    return webdriver.promise.fullyResolved([writeScreenshotPromise, writeConsoleLogPromise]);

};


module.exports = extractAssets;
