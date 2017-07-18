import { Component, OnInit, Input } from '@angular/core';
import {PropertiesService} from "../../../providers/properties/properties.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

declare const moment: any;
@Component({
    moduleId: module.id,
    selector: 'payment-status-cmp',
    templateUrl: 'payment-status.component.html',
    styleUrls: [ 'payment-status.component.css' ]
})  

export class PaymentStatusComponent implements OnInit{
	@Input() private data: any;
	private property;

	constructor( private propertiesService: PropertiesService) {
    }

	ngOnInit() {
	    console.log('Payment status', this.data)
        //this.propertiesService.readDataProperty(this.data.PropertyId);
    }

    private dateFormat(date, format) {
        return moment(date).format(format);
    }
}