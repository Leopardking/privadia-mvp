import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import {AutoCompleteConfig} from './autocomplete.config';
 
@Component({
    selector: 'autocomplete',
    template:`
        <input type="text" />
        <datalist>
            <option *ngFor="let item of filteredData" value="item.id">{{item.value}}</option>
        </datalist>
    `
})
export class AutoComplete {
    @Input('data') data;
    @Input('idKey') idKey;
    @Input('valueKey') valueKey;

    private filteredData;

    constructor() {
        this.filteredData = [];
    }

    ngOnInit() {
        this.filteredData = this.data.map( (item, id) => {
            return { id: item[this.idKey], value: item[this.valueKey] };
        });
    }
}