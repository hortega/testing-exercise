import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import PageObject from '../page-object';
import CallbackPage from '../callback-page';



export default class FacebookConsentPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://www.facebook.com/dialog/oauth');
    }
    consent() {
    	this.browser.sleep(1000);
    	this.browser.executeScript("document.getElementsByName('__CONFIRM__')[0].click()");
    	return new CallbackPage(this.browser);
    }
}	
	