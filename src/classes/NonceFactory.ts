import * as crypto from 'crypto';

export default class NonceFactory {
	getNonce() {
		return crypto.randomBytes(16).toString('base64');
	}
}
