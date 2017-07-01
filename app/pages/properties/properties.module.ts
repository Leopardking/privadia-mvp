import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './properties.routes';
import {CommonModule} from "@angular/common";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardService} from "../../providers/dashboard/dashboard.service";
import {PropertiesService} from "../../providers/properties/properties.service";
import {LookupsService} from "../../providers/lookups/lookups.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CloudinaryModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers: [ DashboardService, PropertiesService, LookupsService ]
})

export class PropertiesModule{}
