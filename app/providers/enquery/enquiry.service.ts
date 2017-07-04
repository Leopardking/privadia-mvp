import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LoginService} from "../login/login.service";

@Injectable()
export class EnquiryService {
	private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public enquiries;

	constructor ( private http: Http,
				  private loginService: LoginService ) {
		console.log('Load Enquiry Service');
	}

	public readDataEnquiries() {
		this.getEnquiries().subscribe(
			d => {
				this.enquiries = d;
			},
			e => {
				console.log('Error Enquiries', e)
			}
		)
	}

	public getEnquiries() {
		if(!this.loginService.getPermission('Lookups/GetRegions'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( this.apiUrl + '/api/Enquiries', options )
            .map(this.extractData)
            .catch(this.handleError);
	}


	public addEnquiry(data) {
		if(!this.loginService.getPermission('Lookups/GetRegions'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( this.apiUrl + '/api/Enquiries', data, options )
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