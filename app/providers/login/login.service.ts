import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
	private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public userInfo: any;
	public isReading = true;

	constructor ( private http: Http ) {
		console.log('Load Login Service');
	}

	public getDataUser() {
		this.getCurrentUser().subscribe(
			d => {
				this.userInfo = d;
				this.isReading = false;
				localStorage.setItem('permissions', JSON.stringify(d.Permissions));
			},
			e => { console.log('Error get user ', e) }
		)
	}

	public login(apiUrl, email, password) {
		const grant_type = "password";

		if (email && password && grant_type) {
			let username = encodeURIComponent(email);
			let pwd = encodeURIComponent(password);
			let gtype = encodeURIComponent(grant_type);

			return this.http.post(apiUrl + '/token', `grant_type=${grant_type}&username=${username}&password=${pwd}`)
				.map(this.extractData)
            	.catch(this.handleError);
        }

	}

	public getPermission(permission) {
		const permissions = JSON.parse(localStorage.getItem('permissions'));
		return permissions.filter( element => element.Name === permission)[0];
	}

	public getCurrentUser() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Users/GetCurrent', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	private extractData(res:Response) {
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