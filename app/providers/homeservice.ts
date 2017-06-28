import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { LoginService } from './login/login.service';
import { PropertiesService } from './properties/properties.service';
import { BookingService } from './booking/booking.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {
	private token:string = "";
	public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
	// public apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net/api';

	//private apiUrl:string = 'http://privadia-api-dev.azurewebsites.net';
	public filter: Filter;

	public regions = [];
	public villas = [];
	public properties = [];

	public metadata;
	public subfilter;

	public isReading;

	constructor (private http: Http, /*private loginService: LoginService,*/ private propertiesService: PropertiesService, private bookingService: BookingService) {
		this.filter = new Filter(1, [1,2,3,4,5,6,7,8], this.dateToDateTime(new Date()), this.dateToDateTime(this.getTomorrow())
				, 0, 0, [], 0);

		this.metadata = [];
		/*
		this.loginService.login(this.apiUrl, "steve@freelancemvc.net", "password")
        		.subscribe( 
                    d => { 
            			this.setToken(d.token_type + ' ' + d.access_token); 
            			this.propertiesService.setToken(this.token);
            			this.bookingService.setToken(this.token);

            			this.propertiesService.setApiURL(this.apiUrl);
            			this.bookingService.setApiURL(this.apiUrl);

						this.readData();
        		    },
                    e => { console.log("error:", e)} 
                );
		*/
		this.propertiesService.setToken(localStorage.getItem('id_token'));
		this.bookingService.setToken(localStorage.getItem('id_token'));

		this.propertiesService.setApiURL(this.apiUrl);
		//this.bookingService.setApiURL(this.apiUrl);

		this.readData();
	}

	public readData() {
		this.isReading = true;

		//--------------		Reading data of villas		-----------///////////
        this.propertiesService.getRegions().subscribe(
            d => {
                this.regions = d;
                
        this.getVillas().subscribe( 
            d => { 
                this.villas = d; 

        this.propertiesService.getMetaData().subscribe(
        	d => {
        		this.metadata = d;

        		console.log(d);

        		this.isReading = false;
        	},
        	e => { console.log("error: ", e); }
        );
            }, 
            e => { console.log("error:", e); } 
        );

            },
            e => { console.log(e); }
        );

        //------------	Reading all properties -------------//
        this.propertiesService.getAllProperties().subscribe(
            d => {
                this.properties = d;
            },
            e => {
                console.log("error: ", e);
            }
        );
	}

    private getTomorrow() {
    	let today = new Date();
    	let tomorrow = new Date();
    	tomorrow.setTime(today.getTime() + (24 * 60 * 60 * 1000));
    	return tomorrow;	
    }

	public setToken(token) {
		this.token = token;
	}

	public getToken() {
		return this.token;
	}

	// Fixes Local Time to UTC offsets.
	private dateToDateTime(pDate) {
		var mDate = new Date(pDate);

		var mHoursOffset = (mDate.getTimezoneOffset() / 60) * -1;
		var mMinutesOffset = (mDate.getTimezoneOffset() % 60) * -1;
		mDate.setHours(pDate.getHours() + mHoursOffset);
		mDate.setMinutes(pDate.getMinutes() + mMinutesOffset);

		return mDate;
	};

	public getVillas() {
		this.isReading = true;

		let header = new Headers();
		header.append('Authorization', localStorage.getItem('id_token') );

		let options = new RequestOptions({ headers: header });

		return this.http.post(this.apiUrl + '/api/properties/searchavailable', this.filter.getCompat(), options)
			.map(this.extractVillaData)
            .catch(this.handleError);
	}

	public logFunc(str) {
		console.log(str);
	}

	private extractVillaData(res: Response) {
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

		this.isReading = false;

	    return Observable.throw(errMsg);
	}

	public setFilter(filter, type) {
		if (type == 1) {
			this.filter.bedrooms = filter.bedrooms;
			this.filter.locations = filter.locations;
			this.filter.checkIn = filter.checkIn;
			this.filter.checkOut = filter.checkOut;
			this.filter.minRate = filter.minRate;
			this.filter.maxRate = filter.maxRate;
		} else if (type == 2) {
			this.filter.MetaDataFilters = filter.MetaDataFilters;
			this.filter.orderBy = filter.orderBy;
		}

		this.isReading = true;
		this.getVillas().subscribe( 
            d => { 
                this.villas = d; 
                this.isReading = false;
            }, 
            e => { console.log("error:", e); } 
        );
	}
}

export class Filter {
	public bedrooms;
	public locations;
	public checkIn;
	public checkOut;
	public minRate;
	public maxRate;
	public MetaDataFilters;
	public orderBy;

	constructor(pBedrooms, pLocations, pCheckIn, pCheckOut,
		pMinRate, pMaxRate, pMetaDataFilters, pOrderBy) {
		this.bedrooms = pBedrooms;
		this.locations = pLocations;
		this.checkIn = pCheckIn;
		this.checkOut = pCheckOut;
		this.minRate = pMinRate;
		this.maxRate = pMaxRate;
		this.MetaDataFilters = pMetaDataFilters;
		this.orderBy = pOrderBy;
	}

	public check(pVilla) {
		var bedroomCheck = (this.bedrooms === pVilla.bedrooms);
		var locationCheck = (this.locations.indexOf(pVilla.location) !== -1);
		var rateCheck = ((pVilla.totalRate >= this.minRate) && (pVilla.totalRate <=
			this.maxRate));

		return (bedroomCheck && locationCheck && rateCheck);
	}

	public getCompat() {
		return {
			Bedrooms: this.bedrooms,
			Regions: this.locations,
			CheckIn: this.dateToDateTime(this.checkIn),
			CheckOut: this.dateToDateTime(this.checkOut),
			MinRate: this.minRate,
			MaxRate: this.maxRate,
			MetaDataFilters: this.MetaDataFilters,
			OrderBy: this.orderBy
		};
	}

	private dateToDateTime(pDate) {
		var mDate = new Date(pDate);

		var mHoursOffset = (mDate.getTimezoneOffset() / 60) * -1;
		var mMinutesOffset = (mDate.getTimezoneOffset() % 60) * -1;
		mDate.setHours(pDate.getHours() + mHoursOffset);
		mDate.setMinutes(pDate.getMinutes() + mMinutesOffset);

		return mDate;
	};
}

export class Villa {
	public name;
	public id;
	public headline;
	public imageId;
	public location;
	public bedrooms;
	public sleeps;
	public boxUrl;
	public collaboratorInitials;
	public totalRate;
	public bathrooms;

	constructor(name, id, headline, imageId, location, bedrooms, sleeps, boxUrl, collaboratorInitial, totalRate, bathroom) {
		this.name = name;
		this.headline = headline;
		this.imageId = imageId;
		this.location = location;
		this.bedrooms = bedrooms;
		this.sleeps = sleeps;
		this.boxUrl = boxUrl;
		this.collaboratorInitials = collaboratorInitial;
		this.totalRate = totalRate;
		this.bathrooms = bathroom;
	}

	public getRichInfo() {
		return "<b>" + this.name + "</b>" +
			"<br>" + this.bedrooms.toString() +
			((this.bedrooms === 1) ? " Bedroom" : " Bedrooms") +
			" | " + this.collaboratorInitials +
			"<br>Area: " + this.location +
			"<br>Full Info: <a href='" + this.boxUrl + "'>" +
			this.boxUrl + "</a>" +
			"<br><b><u>Price: €" + this.totalRate + "</u></b><br><br><br>";
	}

	public getInfo() {
		return this.name +
			"\n" + this.bedrooms.toString() +
			((this.bedrooms === 1) ? " Bedroom" : " Bedrooms") +
			" | " + this.collaboratorInitials +
			"\nArea: " + this.location +
			"\nFull Info: " + this.boxUrl +
			"\nPrice: €" + this.totalRate + '\n\n';
	}
}