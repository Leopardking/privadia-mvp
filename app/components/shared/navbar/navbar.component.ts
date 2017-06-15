import { Component, OnInit } from '@angular/core';
import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit{
    public menuItems: any[];
    public activePage;

    location: Location;
    constructor( location:Location ) {
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
    /*
    getTitle(){
        let title = this.location.prepareExternalUrl(this.location.path());
        if(title.charAt(0) === '/'){
            title = title.slice( 1 );
        }

        for(let item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === title){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    getPath(){
        return this.location.prepareExternalUrl(this.location.path());
    }
    */
}
