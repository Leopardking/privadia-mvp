import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
@Component({
    moduleId: module.id,
    selector: 'property-info-cmp ',
    templateUrl: 'property-info.component.html',
    styleUrls: [ 'property-info.component.css' ]
})  

export class PropertyInfoComponent implements OnInit{
	@Input() private data: any;

	constructor( ) {}

	ngOnInit() {
    }
}