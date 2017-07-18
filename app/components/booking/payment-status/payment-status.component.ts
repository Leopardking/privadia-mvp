import { Component, OnInit, Input } from '@angular/core';
import {PropertiesService} from "../../../providers/properties/properties.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import {LoginService} from "../../../providers/login/login.service";

declare const moment: any;
@Component({
    moduleId: module.id,
    selector: 'payment-status-cmp',
    templateUrl: 'payment-status.component.html',
    styleUrls: [ 'payment-status.component.css' ]
})  

export class PaymentStatusComponent implements OnInit{
	@Input() private data: any;

	constructor( private propertiesService: PropertiesService, private loginService: LoginService) { }

	ngOnInit() { }

    private dateFormat(date, format) {
        return moment(date).format(format);
    }
}