## Description

UI test suite for social login Auth0 feature using WebdriverJS (selenium-webdriver). 

So far it tests only Google, Facebook and Github as identity providers.

## How to run it

Install the dependencies first with:

```sh
npm install
```

Then to run the scenarios: 

```sh
npm test
```

This will run the tests in parallel using ChromeDriver.

If something goes wrong during the test, the browser logs and a screenshot of the browser at the moment of the failure will be stored in /logs.
