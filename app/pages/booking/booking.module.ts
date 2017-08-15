import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './booking-routing.module';
import {CommonModule} from "@angular/common";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/**
 *  Components
 */
import {ForthcomingTableComponent} from "../../components/tables/forthcoming/forthcoming.component";
import { EnquiriesTableComponent } from "../../components/tables/enquiries/enquiries.component";
import { CommonsModule } from './commons/commons.module';
// import { PropertyInfoComponent } from "../../components/booking/property-info/property-info.component";
// import { ProposalComponent } from "../../components/booking/proposal/proposal.component";
// import { PaymentStatusComponent } from "../../components/booking/payment-status/payment-status.component";

/**
 *  My Modules
 */
import { FormFieldsModule } from "../../modules/form-fields/form-field.module";
import { EnquiryService } from "../../providers/enquery/enquiry.service";

/**
 * Providers
 */
import {PropertiesService} from "../../providers/properties/properties.service";
import {LookupsService} from "../../providers/lookups/lookups.service";
import {BookingService} from "../../providers/booking/booking.service";
import {ProposalsService} from "../../providers/proposals/proposals.service";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        Ng2CloudinaryModule,
        FormFieldsModule,
        CommonModule,
        Ng2CloudinaryModule,
        RouterModule.forChild(MODULE_ROUTES),
        CommonsModule
    ],
    declarations: [ MODULE_COMPONENTS,
        ForthcomingTableComponent,
        EnquiriesTableComponent,
        // BookingTabsComponent
        // PropertyInfoComponent,
        // ProposalComponent,
        // PaymentStatusComponent
    ],
    providers: [ BookingService, PropertiesService, LookupsService, ProposalsService, EnquiryService ]
})

export class BookingModule {}
