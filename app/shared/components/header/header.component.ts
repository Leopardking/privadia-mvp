import { Component, OnInit } from '@angular/core';

import { ROUTES } from './navbar-routes.config';
import { Location } from "@angular/common";

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    public activePage = {
        path: null,
        title: null,
        icon: null
    };

    public activePageTmp = {
        path: null,
        title: null,
        icon: null
    };

    public title = null;
    location: Location;

    constructor( location: Location ) {
        this.location = location;
    }

    ngOnInit(){ }

    ngDoCheck() {
        let title = this.location.prepareExternalUrl(this.location.path());
        this.activePage = _.find(ROUTES, (item) => {
            return title.indexOf(item.path) >= 0;
        });
        this.title = this.activePage.title;
        if(localStorage.getItem('title') != null || localStorage.getItem('title') != 'null')
            this.title = this.activePage.title.replace(':id', `"${localStorage.getItem('title')}"`);
    }

    onLoggedout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('permissions');
    }
}
