import { Component, OnInit } from '@angular/core';

import { ROUTES } from './navbar-routes.config';
import { Location } from "@angular/common";

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    public menuItems: any[];
    public activePage = {
        path: null,
        title: null,
        icon: null
    };

    location: Location;
    constructor( location: Location ) {
        this.location = location;
    }

    ngOnInit(){
    }

    ngDoCheck() {
        let title = this.location.prepareExternalUrl(this.location.path());
        this.activePage = ROUTES.find((item) => {
            return title.indexOf(item.path) >= 0;
        });

    }

    onLoggedout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('permissions');
    }
}
