import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/**
 *  Providers
 */

/**
 *  Components
 */
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import {Ng2CloudinaryModule} from "ng2-cloudinary";

@NgModule({
    imports: [
        CommonModule,
        MessageRoutingModule,
        RouterModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        MessageComponent,
    ],
})
export class MessageModule {}
