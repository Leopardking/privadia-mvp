import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {LoginService} from "../login/login.service";
import {LookupsService} from "../lookups/lookups.service";

@Injectable()
export class PropertiesService {
	private apiUrl: string = 'http://privadia-mvp-api-dev.azurewebsites.net';
	// private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public owners = [];
	public properties = [];
	public rates = [];
	public property;
	public regions = [];
	public metadata = [];
	public companies = [];
	public managers = [];
	public PoITypes = [];

	public isReading;

	public region = {
		Id: '',
		Name: ''
	};

	constructor ( private http: Http,
				  private loginService: LoginService,
				  private lookupsService: LookupsService ) {
		console.log('Load Properties Service');
	}

	public readDataProperties() {
		this.getAllProperties().subscribe(
			d => {
				this.properties = d;
			},
			e => {
				console.log("error properties: ", e);
			}
		);

	}

	public readDataProperty(id) {
		this.isReading = true;
		this.getPropertyById(id).subscribe(
			d => {
				this.property = d;
				this.isReading = false;
			},
			e => {
				console.log("error properties: ", e);
			}
		);

	}

	public readDataRegions() {
		this.lookupsService.getRegions().subscribe(
			d => {
				this.regions = d;
			},
			e => {
				console.log("error regions:", e);
			}
		);
	}

	public readDataMetadata() {
		this.lookupsService.getMetaData().subscribe(
			d => {
				this.metadata = d;
			},
			e => {
				console.log("error metadata:", e);
			}
		);
	}

	public readDataOwners() {
		this.lookupsService.getOwners().subscribe(
			d => {
				this.owners = d;
			},
			e => {
				console.log("error owner:", e);
			}
		);
	}

	public readDataPoITypes() {
		this.lookupsService.getPoITypes().subscribe(
			d => {
				this.PoITypes = d;
			},
			e => {
				console.log("error owner:", e);
			}
		);
	}

	public readDataCompanies() {
		this.lookupsService.getManagementCompanies().subscribe(
			d => {
				this.companies = d;
			},
			e => { console.log('Error ManagementCompanies', e) }
		)
	}

	public readDataManagers(Id) {
		this.lookupsService.getManagersByCompany(Id).subscribe(
			d => {
				this.managers = d;
			},
			e => { console.log('Error ManagersByCompany', e) }
		)
	}

	public readDataRates(Id) {
		this.getRates(Id).subscribe(
			d => {
				this.rates = d;
			},
			e => { console.log('Error readDataManagers', e) }
		)
	}

	public getAllProperties() {
		if(!this.loginService.getPermission('Properties/Get'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Properties/', options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getPropertyById(id) {
		if(!this.loginService.getPermission('Properties/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Properties/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public updateProperty(data) {
		if(!this.loginService.getPermission('Properties/Put'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Properties/', data, options)
				.map(this.extractData)
				.catch(this.handleError);
	}

	public addProperty(data) {
		if(!this.loginService.getPermission('Properties/Post'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Properties/', data, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public deleteProperty(id) {
		if(!this.loginService.getPermission('Properties/Delete'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.delete( this.apiUrl + '/api/Properties/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getVillas(filter) {
		if(!this.loginService.getPermission('Properties/SearchAvailable'))
			return Observable.throw(null);

		let header = new Headers({ 'Authorization': this.token });
		let options = new RequestOptions({ headers: header });

		return this.http.post(this.apiUrl + '/api/Properties/SearchAvailable', filter, options)
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getRates(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );
		this.isReading = true;

		return this.http.get( this.apiUrl + '/api/Rates/ByProperty/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public saveRate(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Rates/', data, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public deleteRate(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.delete( this.apiUrl + '/api/Rates/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getQuote(data) {
		if(!this.loginService.getPermission('Rates/GetQuote'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Rates/GetQuote', data, options )
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

	public extractData(res:Response) {
		let body = res.json();

	    return body || { };
	}

	public handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			errMsg = error.json() || '';
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

	    return Observable.throw(errMsg);
	}
}