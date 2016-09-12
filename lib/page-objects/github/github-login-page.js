import webdriver from 'selenium-webdriver';
import { until, By } from 'selenium-webdriver';
import Configuration from '../../configuration';
import PageObject from '../page-object';
import GithubApplicationsPage from './github-applications-page';


export default class GithubLoginPage extends PageObject {
    constructor(browser) {
        super(browser, 'https://github.com/login');
        this.credentials = new Configuration();
    }

    login(credentials) {
        this.browser.findElement(By.id("login_field")).sendKeys(this.credentials.user);
        this.browser.findElement(By.id("password")).sendKeys(this.credentials.password);
        return this.browser.findElement(By.name("commit")).click();

    }

}
