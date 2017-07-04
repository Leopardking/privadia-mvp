import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dialog-cmp ',
    templateUrl: 'dialog.component.html',
    styleUrls: [ 'dialog.component.css' ]
})  

export class DialogComponent implements OnInit{
	@Input('data')	private data: any;

	constructor( ) { }

	ngOnInit() { }
}