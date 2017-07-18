import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LoginService} from "../login/login.service";
import {ProposalsService} from "../proposals/proposals.service";

declare const $: any;
@Injectable()
export class EnquiryService {
	private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
	private token: string = localStorage.getItem('id_token');

	public enquiries;
	public enquiry;

	constructor ( private http: Http,
				  private loginService: LoginService,
				  private proposalsService: ProposalsService ) {
		console.log('Load Enquiry Service');
	}

	public readDataEnquiries() {
		this.getEnquiries().subscribe(
			d => {
				this.enquiries = d;
			},
			e => {
				console.log('Error Enquiries 1', e)
			}
		)
	}

	public readDataEnquiry(id) {
		this.getEnquiryById(id).subscribe(
			d => {
				this.enquiry = d;
			},
			e => {
				console.log('Error Enquiries 2', e)
			}
		)
	}

	public createProposal(id) {
		this.proposalsService.createProposals(id).subscribe(
			d => {
				this.enquiry = d;
				$.notify({
					icon: "notifications",
					message: "Proposal Created Successfully"

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
				console.log('Error Create Proposal', e)
			}
		)
	}

	public acceptProposal(id) {
		this.proposalsService.acceptProposals(id).subscribe(
			d => {
				this.enquiry = d;
				$.notify({
					icon: "notifications",
					message: "Proposal Accepted Successfully"

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
				console.log('Error Create Proposal', e)
			}
		)
	}

	public submitProposal(id) {
		this.proposalsService.submitProposals(id).subscribe(
			d => {
				this.enquiry = d;
				$.notify({
					icon: "notifications",
					message: "Proposal Submitted Successfully"

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
				console.log('Error Create Proposal', e)
			}
		)
	}

	public cancelProposal(id) {
		this.cancelEnquiry(id).subscribe(
			d => {
				this.enquiry = d;
				$.notify({
					icon: "notifications",
					message: "Proposal Canceled Successfully"

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
				console.log('Error Create Proposal', e)
			}
		)
	}

	public declineProposal(id) {
		this.declineEnquiry(id).subscribe(
			d => {
				this.enquiry = d;
				$.notify({
					icon: "notifications",
					message: "Proposal Declined Successfully"

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
				console.log('Error Create Proposal', e)
			}
		)
	}

	public getEnquiries() {
		if(!this.loginService.getPermission('Enquiries/Get'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( `${this.apiUrl}/api/Enquiries`, options )
            .map(this.extractData)
            .catch(this.handleError);
	}


	public addEnquiry(data) {
		if(!this.loginService.getPermission('Enquiries/Post'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( `${this.apiUrl}/api/Enquiries`, data, options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public getEnquiryById(id) {
		if(!this.loginService.getPermission('Enquiries/GetById'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.get( `${this.apiUrl}/api/Enquiries/${id}`, options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public cancelEnquiry(data) {
		if(!this.loginService.getPermission('Enquiries/Cancel'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( `${this.apiUrl}/api/Enquiries/Cancel`, data, options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	public declineEnquiry(data) {
		if(!this.loginService.getPermission('Enquiries/Decline'))
			return Observable.throw(null);

		let header = new Headers( {'Authorization': this.token} );
		let options = new RequestOptions( {headers: header} );

		return this.http.post( `${this.apiUrl}/api/Enquiries/Decline`, data, options )
            .map(this.extractData)
            .catch(this.handleError);
	}

	private extractData(res:Response) {
		let body = res.json();

	    return body || { };
	}

	private handleError(error: Response | any) {
		let errMsg: any;
	    if (error instanceof Response) {
	      errMsg = error.json() || '';
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }

	    return Observable.throw(errMsg);
	}
}