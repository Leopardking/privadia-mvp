import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {LoginService} from "../login/login.service";

@Injectable()
export class PropertiesService {
	// public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
	private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public properties = [];
	public property;
	public isReading;

	public owners;
	public regionArray;
	// private ownerNames;

	// public owner;
	// public ownerName;

	// public ownerName = "";
	// public regionName = "";
	/*
	public owner = {
		Id: '',
		Name: ''
	};
	*/
	public region = {
		Id: '',
		Name: ''
	};

	constructor ( private http: Http,
				  private loginService: LoginService ) { }

	public getDataProperties() {
		this.getAllProperties().subscribe(
			d => {
				this.properties = d;
			},
			e => {
				console.log("error properties: ", e);
			}
		);

	}
/*
	public getDataProperty(id) {
		this.isReading = true;
		this.getPropertyById(id).subscribe(
			d => {
				this.property = d;

					this.getMetaData().subscribe(
						d => {
							this.metadata = d;
						},
						e => { console.log("Error MetaData: ", e); }
					);

					this.getRegions().subscribe(
						d => {
							this.regionArray = d;
							this.regions = d.map( (item, i) => { return item.Name; } );

						},
						e => { console.log("Error Regions: ", e); }
					);

					this.getOwners().subscribe(
						d => {
							this.owners = d;
							// this.ownerNames = d.map( (item, i) => { return item.Name; } );
						},
						e => { console.log("Error Owner: ", e); }
					);

				this.isReading = false;
			},
			e => { console.log("Error Properties: ", e); }
		);
	}

	public getDataEmptyProperty() {
		this.isReading = true;
		this.getOwners().subscribe(
			d => {
				this.owners = d;
				// this.ownerNames = d.map( (item, i) => { return item.Name; } );

				this.getRegions().subscribe(
					d => {
						this.regionArray = d;
						this.regions = d.map( (item, i) => { return item.Name; } );

						this.getMetaData().subscribe(
							d => {
								this.metadata = d;
								this.isReading = false;
							},
							e => { console.log("Error MetaData: ", e); }
						);	},
					e => { console.log("Error Regions: ", e); }
				);
			},
			e => { console.log("Error Owner: ", e); }
		);
	}
*/
	public getAllProperties() {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Properties/', options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public getPropertyById(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Properties/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public updateProperty(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Properties/', data, options)
				.map(this.extractData)
				.catch(this.handleError);
	}

	public addProperty(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Properties/', data, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public deleteProperty(id) {
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

		return this.http.get( this.apiUrl + '/api/Rates/' + id, options )
				.map(this.extractData)
				.catch(this.handleError);
	}

	public saveRates(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Rates/', data, options )
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