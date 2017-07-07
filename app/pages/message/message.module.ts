import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

/**
 *  Providers
 */
import { EnquiryService } from "../../providers/enquery/enquiry.service";

/**
 *  Components
 */
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import { Ng2CloudinaryModule } from "ng2-cloudinary";
import { EnquiriesTableComponent } from "../../components/tables/enquiries/enquiries.component";
import {ProposalsService} from "../../providers/proposals/proposals.service";

@NgModule({
    imports: [
        CommonModule,
        MessageRoutingModule,
        RouterModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        MessageComponent,
        EnquiriesTableComponent,
    ],
    providers: [ EnquiryService, ProposalsService ]
})
export class MessageModule {}
