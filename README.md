[![Build Status](https://travis-ci.org/hortega/testing-exercise.svg?branch=master)](https://travis-ci.org/hortega/testing-exercise)
## Description

UI test suite for social login Auth0 feature using WebdriverJS (selenium-webdriver). 

So far it tests only Google, Facebook and Github as identity providers.

The way the scenarios work is by login in Auth0 manage console and clicking on the 'Try!' button of each identity provider and checking that the default success callback is reached.

## Requisites

To be able to run this tests you need : 
 * NodeJS 6.X
 * Chromedriver in your PATH. Download it from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads) and make sure it can be executed from the command line.
 * Proper configuration in Auth0 enabling login with all the relevant identity providers. Please note that from accounts in the previou spoint, Google is the one used to login to the manage console, so it's the one you should use to configure these providers.
 * a testing-exercise.properties file in your $HOME directory. The template of this file is:
```sh
user=
password=
fbClientId=
fbAppId=
fbAppSecret=
```
'user' and 'password' are the credentials for all the 3 accounts used in the test.

## How to run it

Install the dependencies first with:

```sh
npm install
```

Then to run the scenarios: 

```sh
npm test
```

This command will run the tests in parallel using ChromeDriver, so you will see several Chrome windows starting up.

## Output

If the tests pass, the only output will be the console one. In case any test fail, the browser logs and a screenshot of the browser at the point of the failure will be stored in /logs. The name of each file will be the name of the failed test.
