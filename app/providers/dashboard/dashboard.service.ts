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

	constructor ( private propertiesService: PropertiesService,
				  private router: Router ) {
		this.readData();
	}

	public readData() {
		this.isReading = true;

		//--------------		Reading data       -----------///////////
		this.propertiesService.getRegions().subscribe(
			d => {
				this.regions = d;
				this.propertiesService.getVillas(this.filter).subscribe(
					d => {
						this.villas = d;

						this.propertiesService.getMetaData().subscribe(
							d => {
								this.metadata = d;
								this.isReading = false;
							},
							e => { console.log("error metadata: ", e); }
						);
					},
					e => { console.log("error villas:", e); }
				);
			},
			e => {
				console.log('error regions', e);
				localStorage.removeItem('id_token');
				this.router.navigate(['/login']);
			}
		);
	}
}
