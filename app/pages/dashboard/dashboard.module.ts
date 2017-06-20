import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';

import {MainService} from "../../providers/homeservice";
import {LoginService} from "../../providers/login/login.service";
import {PropertiesService} from "../../providers/properties/properties.service";
import {BookingService} from "../../providers/booking/booking.service";

import { DashboardComponent } from './dashboard.component';
import { VillaComponent } from '../../components/villa/villa.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule
    ],
    declarations: [ DashboardComponent, VillaComponent ],
    providers: [ MainService, LoginService, PropertiesService, BookingService ]
})
export class DashboardModule {}
