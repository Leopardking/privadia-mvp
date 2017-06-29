import { Injectable } from '@angular/core';

import { PropertiesService } from '../properties/properties.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

declare const moment: any;

@Injectable()
export class DashboardService {
	public filter = {};

	public regions = [];
	public villas = [];
	public properties = [];
	public metadata = [];

	public isReading;

	constructor ( private propertiesService: PropertiesService ) {
		this.readData();
	}

	public readData() {
		this.isReading = true;

		//--------------		Reading data       -----------///////////
		this.propertiesService.getVillas(this.filter).subscribe(
			d => {
				this.villas = d;

				this.propertiesService.getMetaData().subscribe(
					d => {
						this.metadata = d;
					},
					e => { console.log("error metadata: ", e); }
				);

				this.propertiesService.getRegions().subscribe(
					d => {
						this.regions = d;
					},
					e => { console.log('error regions', e) }
				);

				this.isReading = false;
			},
			e => {
				console.log("error villas:", e);
				// localStorage.removeItem('id_token');
				// this.router.navigate(['/login']);
			}
		);
	}
}
