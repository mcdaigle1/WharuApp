export default class HashStore {
	static async addValue(key, value) {	        
		let {EventEmitter} = require('fbemitter');
		let emitter = new EventEmitter();
		emitter.emit(key);
		try {
			const value = await AsyncStorage.setItem(key, value);
		} catch (error) {
			// MCD TODO Error retrieving data
		}		
	}
	
	static async getValue(key) {
		try {
			const value = await AsyncStorage.getItem(key);
		} catch (error) {
			// MCD TODO Error retrieving data
			return null;
		}
		return value;
	}
	
	static async removeValue(key) {
		let {EventEmitter} = require('fbemitter');
		let emitter = new EventEmitter();
		try {
			const value = await AsyncStorage.removeItem(key);
		} catch (error) {
			// MCD TODO Error retrieving data
		}
	    this.emitter.emit(key);
	}

};
