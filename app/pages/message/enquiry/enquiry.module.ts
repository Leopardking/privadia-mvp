import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2CloudinaryModule } from "ng2-cloudinary";

/**
 *  Providers
 */
import { EnquiryService } from "../../../providers/enquery/enquiry.service";
import { MessagesService } from "../../../providers/messages/messages.service";

/**
 *  Components
 */
import { EnquiryComponent } from "./enquiry.component";
import { EnquiryRoutingModule } from './enquiry-routing.module';
import { DialogComponent } from "../../../components/enquiry/dialog/dialog.component";
import { PropertyInfoComponent } from "../../../components/enquiry/property-info/property-info.component";
import { ProposalComponent } from "../../../components/enquiry/proposal/proposal.component";

/**
 *  My Modules
 */
import { FormFieldsModule } from "../../../modules/form-fields/form-field.module";
import {PropertiesService} from "../../../providers/properties/properties.service";
import {LookupsService} from "../../../providers/lookups/lookups.service";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        EnquiryRoutingModule,
        RouterModule,
        Ng2CloudinaryModule,
        FormFieldsModule
    ],
    declarations: [
        EnquiryComponent,
        DialogComponent,
        PropertyInfoComponent,
        ProposalComponent
    ],
    providers: [ EnquiryService, MessagesService, PropertiesService, LookupsService ]
})
export class EnquiryModule {}
