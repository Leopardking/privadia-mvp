import { Component, OnInit, Input } from '@angular/core';
import { MainService, Filter } from '../../../../app/services/homeservice';

import initSemanticSelect = require('../../../../assets/js/init/initSemanticSelect.js');

@Component({
    moduleId: module.id,
    selector: ' metafilter-cmp ',
    templateUrl: 'metafilter.component.html',
    styleUrls: [ 'metafilter.component.css' ]
})

export class MetafilterComponent implements OnInit{

    private collapsed:boolean;
    private subfilters;
    private metafilters;

    constructor ( private mainService: MainService ) {

    }

    ngOnInit() {
        this.collapsed = true;

        this.metafilters = [];
        for (let i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }
    }

    private filterDisplayChange() {
        this.collapsed = !this.collapsed;
    }

    private subfilterChange(e) {
        let optionId = e.target.tagName == "BUTTON" ? e.target.id : e.target.parentElement.parentElement.id;

        this.metafilters[optionId] = !this.metafilters[optionId];
    }

    private applyMetafilter() {
        let metadataFilter = [];
        for (let i = 0; i < 10000; i++) {
            if (this.metafilters[i]) {
                metadataFilter.push(i);
            }
        }

        let filter = new Filter(0,0,0,0,0,0,metadataFilter,0);
        this.mainService.setFilter(filter, 2);
        this.collapsed = true;
    }
}