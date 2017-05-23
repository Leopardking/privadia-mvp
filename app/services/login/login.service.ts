import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
	constructor ( private http: Http ) {

	}

	public login(apiUrl, email, password) {
		var grant_type = "password";

		if (email && password && grant_type) {
			let username = encodeURIComponent(email);
			let pwd = encodeURIComponent(password);
			let gtype = encodeURIComponent(grant_type);

			return this.http.post(apiUrl + '/token', `grant_type=${grant_type}&username=${username}&password=${pwd}`)
				.map(this.extractLoginData)
            	.catch(this.handleError);
        }

	}

	private extractLoginData(res:Response) {
		let body = res.json();

	    return body || { };
	}

	private handleError(error: Response | any) {
		let errMsg: string;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body.error || JSON.stringify(body);
	      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }

	    return Observable.throw(errMsg);
	}
}