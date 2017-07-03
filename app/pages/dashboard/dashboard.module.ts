import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2CloudinaryModule } from "ng2-cloudinary";

/**
 *  Providers
 */
import { DashboardService } from "../../providers/dashboard/dashboard.service";
import { PropertiesService } from "../../providers/properties/properties.service";
import { LookupsService } from "../../providers/lookups/lookups.service";
import { EnquiryService } from "../../providers/enquery/enquiry.service";

/**
 *  Components
 */
import { DashboardComponent } from './dashboard.component';
import { VillaComponent } from '../../components/villa/villa.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardfilterComponent } from "../../components/dashboard-filter/dashboard-filter.component";
import { InputfieldComponent } from "../../components/form-fields/input-field/input-field.component";
import { DatetimefieldComponent } from "../../components/form-fields/datetimepicker-field/datetimepicker-field.component";
import { SelectfieldComponent } from "../../components/form-fields/select-field/select.component";
import { EnquiryComponent } from "../../components/modal/enquiry/enquiry.component";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        DashboardComponent,
        VillaComponent,
        DashboardfilterComponent,
        InputfieldComponent,
        DatetimefieldComponent,
        SelectfieldComponent,
        EnquiryComponent
    ],
    providers: [ DashboardService, PropertiesService, LookupsService, EnquiryService ]
})
export class DashboardModule {}
