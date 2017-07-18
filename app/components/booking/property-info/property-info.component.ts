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
        //this.propertiesService.readDataProperty(this.data.PropertyId);
    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

    private dateFormat(date, format) {
        return moment(date).format(format);
    }
}