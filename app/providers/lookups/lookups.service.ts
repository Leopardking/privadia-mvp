import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LoginService} from "../login/login.service";

@Injectable()
export class LookupsService {
	private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public userInfo: any;
	public companies = [];
	public managers = [];

	constructor ( private http: Http,
				  private loginService: LoginService) {}

	public getDataCompanies() {
		this.getManagementCompanies().subscribe(
			d => {
				console.log('error',)
				this.companies = d;
			},
			e => { console.log('Error ManagementCompanies', e) }
		)
	}

	public getDataManagers() {
		/*
		this.getManagersByCompany().subscribe(
			d => {
				this.managers = d;
			},
			e => { console.log('Error ManagersByCompany', e) }
		)
		*/
	}

	private getManagementCompanies() {
		if(!this.loginService.getPermission('Lookups/GetManagementCompanies'))
			return Observable.throw({error: 'Permission denied'});

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetManagementCompanies', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	private getManagersByCompany() {
		if(!this.loginService.getPermission('Lookups/GetManagersByCompany'))
			return Observable.throw({error: 'Permission denied'});

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetManagersByCompany/6e78b138-4d18-4691-b988-c5057f599bf0', options )
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