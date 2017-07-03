import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

declare const moment: any;
import * as _ from "lodash";
import {PropertiesService} from "../../providers/properties/properties.service";

@Component({
    moduleId: module.id,
    selector: 'dashboard-filter-cmp',
    templateUrl: 'dashboard-filter.component.html',
    styleUrls: [ 'dashboard-filter.component.css' ]
})

export class DashboardfilterComponent implements OnInit{
    @Input('metafilters') private metafilters: any;
    @Input('group') private filterForm;
    // public filterForm = new FormGroup ({});

    constructor ( private dashboardService: DashboardService,
                  private propertiesService: PropertiesService,
                  private builder: FormBuilder) {
    }

    ngOnInit() {
        // this.filterForm = this.builder.group({
        //     Bedrooms: new FormControl(),
        //     CheckIn: new FormControl(moment().format('MM/DD/YYYY')),
        //     CheckOut: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
        //     MaxRate: new FormControl(),
        //     MinRate: new FormControl(),
        //     OrderBy: new FormControl(),
        //     Regions: new FormArray([]),
        //     MetaDataFilters: new FormArray([]),
        // })
    }

    public onSubmit(form) {
        this.propertiesService.getVillas(form).subscribe(
            d => {
                this.dashboardService.villas = d;
                this.dashboardService.isReading = false;
            },
            e => {
                console.log('Get Villas Error', e)
            }
        );
    }

    public metadataChange(e) {
        const control = <FormArray>this.filterForm.controls['MetaDataFilters'];
        const index = _.findIndex(control.value, (val) => { return val == e.target.value});

        if(index == -1)
            return control.push(new FormControl(e.target.value));

        return control.removeAt(index);
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