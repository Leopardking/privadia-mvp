import { Component, OnInit, Input } from '@angular/core';
import { DashboardService, Filter } from '../../providers/dashboard/dashboard.service';

//import initSemanticSelect = require('../../../assets/js/init/initSemanticSelect.js');

import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'dashboard-filter-cmp',
    templateUrl: 'dashboard-filter.component.html',
    styleUrls: [ 'dashboard-filter.component.css' ]
})

export class DashboardfilterComponent implements OnInit{
    @Input('metafilters') private metafilters: any;
/*
    private collapsed:boolean;
    private subfilters;
    private metafilters;
    private order;
*/
    constructor ( private dashboardService: DashboardService ) {
        //console.log('Matedata ',this.dashboardService.metadata)
    }

    ngOnInit() {
        /*
        setTimeout(() => {
            console.log('Matedata ',this.dashboardService.metadata)
        },9000)
        /*
        this.collapsed = true;
        console.log('metafilter');
        this.metafilters = [];
        for (let i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }
        */
    }
/*
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

        let filter = new Filter(0,0,0,0,0,0,metadataFilter,this.order);
        this.dashboardService.setFilter(filter, 2);
        this.collapsed = true;
    }

    private orderChange(evt) {
        let t = evt.target;
        this.order = t.value;

        this.sortVillas(t.value);
    }

    private sortVillas(orderType) {
        let comparefunc = function(a, b) {
            if (a.TotalRate > b.TotalRate) return 1;
            else if (a.TotalRate == b.TotalRate) return 0;
            else return -1;
        }

        let comparefunc1 = function(a, b) {
            if (a.TotalRate > b.TotalRate) return -1;
            else if (a.TotalRate == b.TotalRate) return 0;
            else return 1;
        }

        if (orderType == 0) {
            this.dashboardService.villas.sort(comparefunc1);
        } else {
            this.dashboardService.villas.sort(comparefunc);
        }
    }

    private finished() {
        //$(".selectpicker").selectpicker();
        return "";
    }
    */
}