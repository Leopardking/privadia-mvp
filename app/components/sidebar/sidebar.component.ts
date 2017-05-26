import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';

import initDatetimepickers = require('../../../assets/js/init/initDatetimepickers.js');

import { MainService, Filter } from '../../providers/homeservice';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor ( private mainService: MainService ) {

    }

    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        $.getScript('../../assets/js/plugins/bootstrap-datetimepicker.js');

        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }

    private menuClick() {
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        $("dashboard-cmp .main-content").scrollTop(0);

        return true;
    }
}
