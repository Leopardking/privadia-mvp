import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './commons.routes';
import {CommonModule} from "@angular/common";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import {DashboardService} from "../../../providers/dashboard/dashboard.service";
import {PropertiesService} from "../../../providers/properties/properties.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2AutoCompleteModule,
        Ng2CloudinaryModule,
        FileUploadModule,
        Ng2CloudinaryModule,
        FileUploadModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers: [ DashboardService, PropertiesService ]
})

export class CommonsModule{}
