import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';

/**
 *  Providers
 */
import { DashboardService } from "../../providers/dashboard/dashboard.service";
import { PropertiesService } from "../../providers/properties/properties.service";
import { BookingService } from "../../providers/booking/booking.service";

/**
 *  Components
 */
import { DashboardComponent } from './dashboard.component';
import { VillaComponent } from '../../components/villa/villa.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MetafilterComponent } from "../../components/metafilter/metafilter.component";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
    ],
    declarations: [ DashboardComponent, VillaComponent, MetafilterComponent ],
    providers: [ DashboardService, PropertiesService, BookingService ]
})
export class DashboardModule {}
