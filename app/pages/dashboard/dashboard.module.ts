import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';

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
})
export class DashboardModule {}
