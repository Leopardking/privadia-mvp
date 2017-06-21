import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './addproperty.routes';
import { MODULE_ROUTES as COMMON_ROUTES, MODULE_COMPONENTS as COMMON_COMPONENTS } from '../commons/commons.routes';
import {CommonModule} from "@angular/common";
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardService} from "../../../providers/dashboard/dashboard.service";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        Ng2AutoCompleteModule,
        Ng2CloudinaryModule,
        FileUploadModule,
        RouterModule.forChild(MODULE_ROUTES),
        //RouterModule.forChild(COMMON_ROUTES),
    ],
    declarations: [ MODULE_COMPONENTS, COMMON_COMPONENTS ]
})

export class AddpropertyModule{}
