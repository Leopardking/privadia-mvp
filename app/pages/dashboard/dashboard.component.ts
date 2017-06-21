import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

@Component({
    moduleId: module.id,
    selector: ' dashboard-cmp ',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit{

    constructor ( private dashboardService: DashboardService) { }

    ngOnInit(){}
}
