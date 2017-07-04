import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

/**
 *  Providers
 */
import { EnquiryService } from "../../../providers/enquery/enquiry.service";

/**
 *  Components
 */
import { EnquiryComponent } from "./enquiry.component";
import { EnquiryRoutingModule } from './enquiry-routing.module';
import { Ng2CloudinaryModule } from "ng2-cloudinary";
import { DialogComponent } from "../../../components/enquiry/dialog/dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputfieldComponent } from "../../../components/form-fields/input-field/input-field.component";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        EnquiryRoutingModule,
        RouterModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        EnquiryComponent,
        DialogComponent,
        InputfieldComponent
    ],
    providers: [ EnquiryService ]
})
export class EnquiryModule {}
