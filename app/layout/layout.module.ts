import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../providers/homeservice';
import {LoginService} from "../providers/login/login.service";
import {PropertiesService} from "../providers/properties/properties.service";
import {BookingService} from "../providers/booking/booking.service";

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    providers: [ MainService, LoginService, PropertiesService, BookingService ]
})
export class LayoutModule { }
