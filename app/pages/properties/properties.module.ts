import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './properties.routes';
import {CommonModule} from "@angular/common";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    imports: [
        CommonModule,
        // Ng2CloudinaryModule,
        // FileUploadModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ]
})

export class PropertiesModule{
}
