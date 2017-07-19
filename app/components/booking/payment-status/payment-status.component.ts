import { Component, OnInit, Input } from '@angular/core';
import {PropertiesService} from "../../../providers/properties/properties.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import {LoginService} from "../../../providers/login/login.service";
import {ActivatedRoute} from "@angular/router";
import {BookingService} from "../../../providers/booking/booking.service";
import {handlerErrorNotify} from "../../../helpers/helpers";

declare const moment: any;
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'payment-status-cmp',
    templateUrl: 'payment-status.component.html',
    styleUrls: [ 'payment-status.component.css' ]
})  

export class PaymentStatusComponent implements OnInit{
	@Input() private data: any;
    private bookingId;

	constructor( private bookingService: BookingService, private loginService: LoginService,
                 private route: ActivatedRoute) { }

	ngOnInit() {
        this.route.params.subscribe(params => {
            this.bookingId = params['id'];
        })
    }

	private confirmStatus(TransactionId) {
        this.bookingService.readDataConfirmPayment({BookingId: this.bookingId, TransactionId: TransactionId})
    }

    private formatDate(date, format) {
        return moment(date).format(format);
    }
}