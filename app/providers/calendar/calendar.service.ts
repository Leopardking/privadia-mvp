import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {handlerErrorNotify} from "../../helpers/helpers";

declare const $: any;

@Injectable()
export class CalendarService {
	private apiUrl: string = 'http://privadia-mvp-api-dev.azurewebsites.net';
	// public apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public bookings = [];
	public booking;

	constructor ( private http: Http ) { }

	public getCalendarByProperty(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get(`${this.apiUrl}/api/Calendar/GetByProperty/${id}`, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Get Booking By Id
    public getCalendar(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get(`${this.apiUrl}/api/Calendar/${id}`, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    public addCalendar(data) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post(`${this.apiUrl}/api/Calendar`, data, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    public deleteAvailability(id) {
		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.delete(`${this.apiUrl}/api/Calendar/111${id}`, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

	private extractData(res:Response) {
		let body = res.text() && res.json();

	    return body || { };
	}

	private handleError(error: Response | any) {
		console.log('error data',Response);
		let errMsg: string;
	    if (error instanceof Response) {
			errMsg = error.json() || '';
	    } else {
	      	errMsg = error.message ? error.message : error.toString();
	    }

	    return Observable.throw(errMsg);
	}
}