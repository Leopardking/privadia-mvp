import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
//import { TranslateModule } from '@ngx-translate/core';
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
        //NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        //TranslateModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    providers: [ MainService, LoginService, PropertiesService, BookingService ]
})
export class LayoutModule { }
