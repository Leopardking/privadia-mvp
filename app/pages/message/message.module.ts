import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

/**
 *  Providers
 */

/**
 *  Components
 */
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {EnquiryComponent} from "./enquiry/enquiry.component";

@NgModule({
    imports: [
        CommonModule,
        MessageRoutingModule,
        RouterModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        MessageComponent,
        EnquiryComponent
    ],
})
export class MessageModule {}
