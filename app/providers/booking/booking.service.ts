import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LoginService} from "../login/login.service";
import {handlerErrorNotify} from "../../helpers/helpers";

declare const $: any;

@Injectable()
export class BookingService {
	private apiUrl: string = 'http://privadia-mvp-api-dev.azurewebsites.net';
	// public apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public bookings = [];
	public booking;

	constructor ( private http: Http,
				  private loginService: LoginService ) { }

	public getDataBookings() {
		this.allBookings().subscribe(
			d => {
				this.bookings = d;
			},
			e => {
				console.log("error: ", e);
			}
		);
	}

	public readDataBookingById(id) {
		this.getBookingById(id).subscribe(
			d => {
				this.booking = d;
			},
			e => {
				console.log("error: ", e);
			}
		);
	}

	public readDataConfirmPayment(data) {
		this.confirmPayment(data).subscribe(
			d => {
				this.booking = d;
				$.notify({
					icon: "notifications",
					message: "Payment Confirmed Successfully"

				},{
					type: 'success',
					timer: 3000,
					placement: {
						from: 'top',
						align: 'right'
					}
				});
			},
			e => {
				console.log("error: ", e);
				handlerErrorNotify(e.ExceptionMessage);
			}
		);
	}

	public readDataSignContract(id) {
		this.signContract(id).subscribe(
			d => {
				this.booking = d;
				$.notify({
					icon: "notifications",
					message: "Contract Signed Successfully"

				},{
					type: 'success',
					timer: 3000,
					placement: {
						from: 'top',
						align: 'right'
					}
				});
			},
			e => {
				console.log("error: ", e);
			}
		);
	}

	public allBookings() {
		if(!this.loginService.getPermission('Bookings/Get'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get(this.apiUrl + '/api/Bookings/', options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Get Booking By Id
    public getBookingById(id) {
		if(!this.loginService.getPermission('Bookings/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get(this.apiUrl + '/api/Bookings/' + id, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Update Booking
    public updateBooking(data) {
		if(!this.loginService.getPermission('Bookings/Put'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.put(this.apiUrl + '/api/Bookings/', data, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    public signContract(data) {
		if(!this.loginService.getPermission('Bookings/SignContract'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post(this.apiUrl + '/api/Bookings/SignContract', data, options)
				.map(this.extractData)
				.catch(this.handleError);
    }


    public confirmPayment(data) {
		if(!this.loginService.getPermission('Bookings/ConfirmPayment'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post(this.apiUrl + '/api/Bookings/ConfirmPayment', data, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Add New Booking
    public addBooking(data) {
		if(!this.loginService.getPermission('Properties/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post(this.apiUrl + '/api/Bookings/', data, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Delete Booking
    public deleteBooking(id) {
		if(!this.loginService.getPermission('Properties/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.delete(this.apiUrl + '/api/Bookings/'+id, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //Searchh Properties
    public searchProperties(name) {
		if(!this.loginService.getPermission('Properties/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post(this.apiUrl + '/api/properties/search?name=' + name, null, options)
				.map(this.extractData)
				.catch(this.handleError);
    }

    //All Properties
    public allProperties(name) {
		if(!this.loginService.getPermission('Properties/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get(this.apiUrl + '/api/properties/', options)
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
			errMsg = error.json() || '';
	    } else {
	      	errMsg = error.message ? error.message : error.toString();
	    }

	    return Observable.throw(errMsg);
	}    
}