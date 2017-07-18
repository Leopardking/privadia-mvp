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
	private property;

	constructor( private propertiesService: PropertiesService) {
    }

	ngOnInit() {
        console.log('Propery Info status', this.data)
        //this.propertiesService.readDataProperty(this.data.PropertyId);
    }

    private dateFormat(date, format) {
        return moment(date).format(format);
    }
}