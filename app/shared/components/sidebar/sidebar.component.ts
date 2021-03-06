import {Component, OnInit} from '@angular/core';

import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit{
    public menuItems: any[];

    constructor () {}

    ngOnInit() {
        $.getScript('../../../assets/js/init/initMenu.js');
        $.getScript('../../../assets/js/sidebar-moving-tab.js');
        //$.getScript('../../assets/js/plugins/bootstrap-datetimepicker.js');

        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }

    onLoggedout() {
        $('body').removeClass('nav-open');
        localStorage.removeItem('id_token');
    }

    private menuClick() {
        //$('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        //$("dashboard-cmp .main-content").scrollTop(0);

        //return true;
    }

    private getFullName() {
        const user = JSON.parse(localStorage.getItem('user'));
        return `${user.FirstName} ${user.LastName}`;
    }
}
