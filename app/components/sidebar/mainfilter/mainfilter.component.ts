import { Component, OnInit, ViewChild } from '@angular/core';

import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');

import { MainService, Filter } from '../../../providers/homeservice';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'mainfilter-cmp',
    templateUrl: 'mainfilter.component.html',
    styleUrls: [ './mainfilter.component.css' ]
})

export class MainfilterComponent implements OnInit {
	@ViewChild('bottombudget') bottombudget;
	@ViewChild('topbudget') topbudget;
	@ViewChild('checkin') checkin;
	@ViewChild('checkout') checkout;

    public menuItems: any[];
    private bedrooms;
    private regions;
    private filterLocations: any[];

    constructor ( private mainService: MainService ) {

    }

    ngOnInit() {
        $.getScript('../../../assets/js/sidebar-moving-tab.js');
        $.getScript('../../../assets/js/plugins/bootstrap-datetimepicker.js');

        this.filterLocations = [1,2,3,4,5,6,7,8];

        initDatetimepickers();

		$("#sliderBedroom").noUiSlider({
            start: 1,
            connect: "lower",
            range: {
                min: 1,
                max: 15
            }
        })
        .on('slide', function() {
        	$("#bedroomcount").html(parseInt($(this).val()));
        });
    }

    private applyFilter() {
    	let checkinDate = new Date(this.checkin.nativeElement.value),
    		checkoutDate = new Date(this.checkout.nativeElement.value);

    	let filter = new Filter($("#bedroomcount").val(), this.filterLocations, 
    		checkinDate, checkoutDate, 
    		this.bottombudget.nativeElement.value, this.topbudget.nativeElement.value,
    		[], 0);

    	this.mainService.setFilter(filter, 1);
    }

    private locationLabelClick(evt)
    {
    	let t = evt.target;
    	t.parentElement.children[0].click();
    }

    private locationChange(evt) {
    	let t = evt.target;
    	let loc = parseInt(t.value);
    	if (t.checked) {
    		this.filterLocations.push(loc);
    	} else {
    		let index = this.filterLocations.indexOf(loc);
    		this.filterLocations.splice(index, 1);
    	}
    }

    private getToday() {
    	let today = new Date();
    	let mm = today.getMonth()+1;
    	let dd = today.getDate();
    	let yy = today.getFullYear();
    	return `${mm}/${dd}/${yy}`;
    }

    private getTomorrow() {
    	let today = new Date();
    	let tomorrow = new Date();
    	tomorrow.setTime(today.getTime() + (24 * 60 * 60 * 1000));
    	let mm = tomorrow.getMonth()+1;
    	let dd = tomorrow.getDate();
    	let yy = tomorrow.getFullYear();
    	return `${mm}/${dd}/${yy}`;	
    }
}
