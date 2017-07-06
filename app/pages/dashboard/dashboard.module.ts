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
import { EnquiryComponent } from "../../components/modal/enquiry/enquiry.component";

/**
 *  My Modules
 */
import { FormFieldsModule } from "../../modules/form-fields/form-field.module";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CloudinaryModule,
        FormFieldsModule
    ],
    declarations: [
        DashboardComponent,
        VillaComponent,
        DashboardfilterComponent,
        EnquiryComponent
    ],
    providers: [ DashboardService, PropertiesService, LookupsService, EnquiryService ]
})
export class DashboardModule {}
