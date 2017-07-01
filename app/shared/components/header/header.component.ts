import { Component, OnInit } from '@angular/core';

import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import {Location} from "@angular/common";
// import { Router, NavigationEnd } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    public menuItems: any[];
    public activePage;

    location: Location;
    constructor( location: Location ) {
        this.location = location;
    }

    ngOnInit(){
    }

    ngDoCheck() {
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);

        let title = this.location.prepareExternalUrl(this.location.path());
        this.activePage = this.menuItems.find((item) => {
            return item.path == title
        })

        this.activePage = this.activePage || { path: '/properties/editproperty', title: 'Edit Property', menuType: MenuType.LEFT, icon: 'store'}
    }

    onLoggedout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('permissions');
    }
/*
    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }
    ngOnInit() {}

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }


    changeLang(language: string) {
        //this.translate.use(language);
    }
 */
}
