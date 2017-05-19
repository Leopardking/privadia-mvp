import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {
	private apiUrl: string;
	private token: string;

	private header;
	private options;

	public setToken(str) {
		this.token = str;
		this.header = new Headers( {'Authorization': this.token} );
		this.options = new RequestOptions( {headers: this.header} );
	}

	public setApiURL(url) {
		this.apiUrl = url;
	}

	constructor ( private http: Http ) {
	}

	public allBookings() {
        return this.http.get(this.apiUrl + '/api/bookings/', this.options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Get Booking By Id
    public getBookingById(id) {
        return this.http.get(this.apiUrl + '/api/bookings/'+id, this.options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Update Booking
    public updateBooking(data) {
        return this.http.post(this.apiUrl + '/api/bookings/', data, this.options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Add New Booking
    public addBooking(data) {
        return this.http.post(this.apiUrl + '/api/bookings/', data, this.options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Delete Booking
    public deleteBooking(id) {
        return this.http.delete(this.apiUrl + '/api/bookings/'+id, this.options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Searchh Properties
    public searchProperties(name) {
        return this.http.post(this.apiUrl + '/api/properties/search?name=' + name, null, this.options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //All Properties
    public allProperties(name) {
        return this.http.get(this.apiUrl + '/api/properties/', this.options)
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