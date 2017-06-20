import { Component, OnInit } from '@angular/core';
import { MainService } from '../../providers/homeservice';

import { VillaComponent } from '../../components/villa/villa.component';

@Component({
    moduleId: module.id,
    selector: ' dashboard-cmp ',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit{

	private villas;
    private regions: any;

    constructor ( private mainService: MainService) {

    }

    ngOnInit(){

    }
}
