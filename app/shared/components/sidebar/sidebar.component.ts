import {Component, OnInit} from '@angular/core';
import {MainService} from "../../../providers/homeservice";

import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit{
    public menuItems: any[];

    constructor ( private mainService: MainService ) {

    }

    ngOnInit() {
        $.getScript('../../../assets/js/init/initMenu.js');
        $.getScript('../../../assets/js/sidebar-moving-tab.js');
        //$.getScript('../../assets/js/plugins/bootstrap-datetimepicker.js');

        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }

    private menuClick() {
        //$('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        //$("dashboard-cmp .main-content").scrollTop(0);

        //return true;
    }
}
