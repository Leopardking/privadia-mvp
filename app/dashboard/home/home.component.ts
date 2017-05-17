import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../app/services/homeservice';

import { VillaComponent } from '../components/villa/villa.component';

@Component({
    moduleId: module.id,
    selector: ' home-cmp ',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css' ]
})

export class HomeComponent implements OnInit{

	private villas;
    private regions: any;

    constructor ( private mainService: MainService) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){

    }
}
