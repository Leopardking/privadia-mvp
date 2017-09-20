import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

@Injectable()
export class LoginService {
	private apiUrl: string = 'http://privadia-mvp-api-dev.azurewebsites.net';
	// private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public userInfo: any;
	public isReading = true;

	constructor ( private http: Http ) {}

	public getDataUser(header) {
		this.getCurrentUser(header).subscribe(
			d => {
				this.userInfo = d;
				this.isReading = false;
				localStorage.setItem('user', JSON.stringify(d));
			},
			e => {
				console.log('Error get user ', e)
			}
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
		const permissions = JSON.parse(localStorage.getItem('user')).Permissions;
		// console.log('Permission ', permissions);
		return permissions.find( element => element.Name === permission);
	}

	public getRoles(role) {
		const roles = JSON.parse(localStorage.getItem('user')).Roles;
		return roles.find( element => element.Name === role);
	}

	public getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	public getCurrentUser(headerToken: any) {
		let header = new Headers( {'Authorization': headerToken || this.token} );
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
		let errMsg: any;
		console.log('Error Login', error)
	    if (error instanceof Response) {
	      errMsg = error.json() || '';
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }

	    return Observable.throw(errMsg);
	}
}