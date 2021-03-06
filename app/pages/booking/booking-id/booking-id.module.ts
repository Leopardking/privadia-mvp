import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './booking-id.routes';
import {CommonModule} from "@angular/common";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {FileUploadModule} from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BookingService} from "../../../providers/booking/booking.service";
import {ForthcomingTableComponent} from "../../../components/tables/forthcoming/forthcoming.component";

/**
 *  Components
 */
import { PropertyInfoComponent } from "../../../components/booking/property-info/property-info.component";
import { ProposalComponent } from "../../../components/booking/proposal/proposal.component";
import { PaymentStatusComponent } from "../../../components/booking/payment-status/payment-status.component";

/**
 *  My Modules
 */
import { FormFieldsModule } from "../../../modules/form-fields/form-field.module";
import {PropertiesService} from "../../../providers/properties/properties.service";
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {ProposalsService} from "../../../providers/proposals/proposals.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import { CommonsModule } from '../commons/commons.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        Ng2CloudinaryModule,
        FormFieldsModule,
        CommonsModule,

        CommonModule,
        Ng2CloudinaryModule,
        // FileUploadModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS,
        PropertyInfoComponent,
        ProposalComponent,
        PaymentStatusComponent
    ],
    providers: [ BookingService, PropertiesService, LookupsService, ProposalsService, EnquiryService ]
})

export class BookingIdModule {}
