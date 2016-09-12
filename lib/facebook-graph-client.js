import webdriver from 'selenium-webdriver';
import request from 'request';
import Configuration from './configuration';


export default class FacebookGraphClient {
    constructor() {
        this.configuration = new Configuration();
    }
    getAccessToken() {
        let getAccessTokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${this.configuration.facebookAppId}&client_secret=${this.configuration.facebookAppSecret}&grant_type=client_credentials`;
        var d = webdriver.promise.defer();
        request(getAccessTokenUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                d.fulfill(body);
            }
        });
        return d.promise;
    }
    revoke(accessToken) {
        return this.getAccessToken().then((accessToken) => {
            var d = webdriver.promise.defer();
            let revokeUrl = `https://graph.facebook.com/${this.configuration.facebookClientId}/permissions?${accessToken}`;
            request.delete(revokeUrl, function(error, response, body) {
                if (!error && (response.statusCode == 200 || response.statusCode == 400)) {
                    d.fulfill();
                } else {
                    d.reject();
                }

            });
            return d.promise;

        })
    }
}
