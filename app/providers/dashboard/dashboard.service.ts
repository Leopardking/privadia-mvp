import { Injectable } from '@angular/core';

import { PropertiesService } from '../properties/properties.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {LookupsService} from "../lookups/lookups.service";

declare const moment: any;

@Injectable()
export class DashboardService {
	public filter = {};
	public villas = [];

	public regions = [];
	public metadata = [];


	public isReading;

	constructor ( private propertiesService: PropertiesService,
				  private lookupsService: LookupsService ) {

		this.readDataVillas();
		this.readDataRegions();
		this.readDataMetadata();
	}

	public readDataVillas() {
		this.isReading = true;

		//--------------		Reading data       -----------///////////
		this.propertiesService.getVillas(this.filter).subscribe(
			d => {
				this.villas = d;

				/*
				this.lookupsService.getMetaData().subscribe(
					d => {
						this.metadata = d;
					},
					e => { console.log("error metadata: ", e); }
				);

				this.lookupsService.getRegions().subscribe(
					d => {
						this.regions = d;
					},
					e => { console.log('error regions', e) }
				);
				*/

				this.isReading = false;
			},
			e => {
				console.log("error villas:", e);
				// localStorage.removeItem('id_token');
				// this.router.navigate(['/login']);
			}
		);
	}

	public readDataRegions() {
		this.isReading = true;

		//--------------		Reading data       -----------///////////
		this.lookupsService.getRegions().subscribe(
			d => {
				this.regions = d;
				this.isReading = false;
			},
			e => {
				console.log("error regions:", e);
			}
		);
	}

	public readDataMetadata() {
		this.isReading = true;

		//--------------		Reading data       -----------///////////
		this.lookupsService.getMetaData().subscribe(
			d => {
				this.metadata = d;
				this.isReading = false;
			},
			e => {
				console.log("error metadata:", e);
			}
		);
	}
}
