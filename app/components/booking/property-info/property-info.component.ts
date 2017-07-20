import { Component, OnInit, Input } from '@angular/core';
import {PropertiesService} from "../../../providers/properties/properties.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

declare const moment: any;
@Component({
    moduleId: module.id,
    selector: 'property-info-cmp ',
    templateUrl: 'property-info.component.html',
    styleUrls: [ 'property-info.component.css' ]
})  

export class PropertyInfoComponent implements OnInit{
	@Input() private data: any;
	@Input() private errorForm: any;
	@Input('group') private bookingForm: any;
	private property;

	constructor( private propertiesService: PropertiesService) {
    }

	ngOnInit() { }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

    private dateFormat(date, format) {
        return moment(date).format(format);
    }
}