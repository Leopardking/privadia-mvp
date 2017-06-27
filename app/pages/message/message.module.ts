import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/**
 *  Providers
 */
import { DashboardService } from "../../providers/dashboard/dashboard.service";
import { PropertiesService } from "../../providers/properties/properties.service";
import { BookingService } from "../../providers/booking/booking.service";

/**
 *  Components
 */
import { MessageComponent } from './message.component';
import { VillaComponent } from '../../components/villa/villa.component';
import { MessageRoutingModule } from './message-routing.module';
// import { MetafilterComponent } from "../../components/metafilter/metafilter.component";
import { DashboardfilterComponent } from "../../components/dashboard-filter/dashboard-filter.component";
import { InputfieldComponent } from "../../components/form-fields/input-field/input-field.component";
import { DatetimefieldComponent } from "../../components/form-fields/datetimepicker-field/datetimepicker-field.component";
import { SelectfieldComponent } from "../../components/form-fields/select-field/select.component";
import {Ng2CloudinaryModule} from "ng2-cloudinary";

@NgModule({
    imports: [
        CommonModule,
        MessageRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CloudinaryModule
    ],
    declarations: [
        MessageComponent,
        VillaComponent,
        DashboardfilterComponent,
        InputfieldComponent,
        DatetimefieldComponent,
        SelectfieldComponent
    ],
    providers: [ DashboardService, PropertiesService, BookingService ]
})
export class MessageModule {}
