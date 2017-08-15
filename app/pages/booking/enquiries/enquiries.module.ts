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
import { EnquiriesComponent} from './enquiries.component';
import { EnquiriesRoutingModule } from './enquiries-routing.module';
import { Ng2CloudinaryModule } from "ng2-cloudinary";
import { EnquiriesTableComponent } from "../../../components/tables/enquiries/enquiries.component";
import {ProposalsService} from "../../../providers/proposals/proposals.service";

@NgModule({
    imports: [
        CommonModule,
        EnquiriesRoutingModule,
        RouterModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        EnquiriesComponent,
        EnquiriesTableComponent,
    ],
    providers: [ EnquiryService, ProposalsService ]
})
export class EnquiryModule {}
