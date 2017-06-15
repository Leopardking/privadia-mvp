import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class PropertiesService {
	private apiUrl: string;
	private token: string;
	public isReading;

	public setToken(str) {
		this.token = str;
	}

	public setApiURL(url) {
		this.apiUrl = url;
	}

	constructor ( private http: Http ) {
	}

	public getAllProperties() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/properties/', options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getPropertyById(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/properties/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public updateProperty(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/properties/', data, options)
				.map(this.extractData)
				.catch(this.handleError);
	}

	public addProperty(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/properties/', data, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public deleteProperty(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.delete( this.apiUrl + '/api/properties/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getRates(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );
		this.isReading = true;

		return this.http.get( this.apiUrl + '/api/rates/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public saveRates(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/rates/', data, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getregions() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/lookups/getregions', options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getOwners() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/lookups/getowners', options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getPoITypes() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/lookups/getPointOfInterestTypes', options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getMetaData() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/lookups/getMetaData', options )
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

	public getBookings(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/bookings/property/' + id, options)
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

	public extractData(res:Response) {
		let body = res.json();

	    return body || { };
	}

	public handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			console.log('body',err)
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

	    return Observable.throw(errMsg);
	}
}