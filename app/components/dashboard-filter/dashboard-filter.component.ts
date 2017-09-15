import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

declare const moment: any;
declare const $: any;

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

    constructor ( private dashboardService: DashboardService,
                  private propertiesService: PropertiesService ) {
    }

    ngOnInit() {
        //Tmp select picker init
        $('.custompicker').selectpicker();

        $(document).mouseup(function (event) {
            const container = $(".extend-filter-container.collapse");
            const _opened = container.hasClass("in")

            if (_opened && !container.is(event.target) && container.has(event.target).length === 0) {
                $('.nav-pills li.active').removeClass('active');
                $('.tab-content div.active').removeClass('active');
                $("#openFilter").click();
            }
        });
    }

    public onSubmit(form) {
        // fixes with dates
        form.CheckIn = moment(form.CheckIn, 'DD/MM/YYYY').format('MM/DD/YYYY');
        form.CheckOut = moment(form.CheckOut, 'DD/MM/YYYY').format('MM/DD/YYYY');
        // ----------------
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