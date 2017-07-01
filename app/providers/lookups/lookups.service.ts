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

	public companies = [];
	public managers = [];
	public regions;
	public metadata;

	constructor ( private http: Http,
				  private loginService: LoginService ) {
		console.log('Load Lookups Service');
	}

	public readDataRegions() {
		this.getRegions().subscribe(
			d => {
				this.regions = d;
			},
			e => { console.log('Error ManagementCompanies', e) }
		)
	}

	public readDataMetadata() {
		this.getMetaData().subscribe(
			d => {
				this.metadata = d;
			},
			e => { console.log('Error ManagementCompanies', e) }
		)
	}

	public getManagementCompanies() {
		// if(!this.loginService.getPermission('Lookups/GetManagementCompanies'))
		// 	return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetManagementCompanies', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getManagersByCompany(id) {
		// if(!this.loginService.getPermission('Lookups/GetManagersByCompany'))
		// 	return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetManagersByCompany/' + id, options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getRegions() {
		// if(!this.loginService.getPermission('Lookups/GetRegions'))
		// 	return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetRegions', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getOwners() {
		// if(!this.loginService.getPermission('Lookups/GetOwners'))
		// 	return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetOwners', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getHousekeepingOptions() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetHousekeepingOptions/', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getPoITypes() {
		// if(!this.loginService.getPermission('Lookups/GetPointOfInterestTypes'))
		// 	return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetPointOfInterestTypes', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getMetaData() {
		// if(!this.loginService.getPermission('Lookups/GetMetaData'))
		// 	return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetMetaData', options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getChildrenAllowed() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Lookups/GetChildrenOptions', options )
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