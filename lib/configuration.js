import PropertiesReader from 'properties-reader';
import util from 'util';

export default class Configuration {
	constructor() {
		let homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
		let properties = PropertiesReader(homeDir + '/testing-exercise.properties');		
		this.user = properties.get("user");
		this.password = properties.get("password");
		this.facebookClientId = properties.get("fbClientId");
		this.facebookAppId = properties.get("fbAppId");
		this.facebookAppSecret = properties.get("fbAppSecret");
	}
}



