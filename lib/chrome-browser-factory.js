import webdriver from 'selenium-webdriver';
let Capabilities = webdriver.Capabilities;
let logging = webdriver.logging;


export default class ChromeBrowserFactory {
    static build() {
        let prefs = new logging.Preferences();
        prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);

        let caps = Capabilities.chrome();
        caps.setLoggingPrefs(prefs);
        return new webdriver.Builder().withCapabilities(caps).build();
    }

}
