import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';


export default class FacebookConsentPage {
    constructor(browser) {
        this.browser = browser;
    }
    consent() {
    	this.browser.sleep(1000)
    	return this.browser.executeScript("document.getElementsByName('__CONFIRM__')[0].click()");
    }
}	
	