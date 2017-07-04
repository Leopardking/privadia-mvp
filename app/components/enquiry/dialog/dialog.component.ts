import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
@Component({
    moduleId: module.id,
    selector: 'dialog-cmp ',
    templateUrl: 'dialog.component.html',
    styleUrls: [ 'dialog.component.css' ]
})  

export class DialogComponent implements OnInit{
	@Input() private data: any;
    private user;

	constructor( ) {
	    this.user = JSON.parse(localStorage.getItem('user'))
    }

	ngOnInit() {
        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });

        console.log('data ', this.data)
	    console.log('User ', this.user)
    }
}