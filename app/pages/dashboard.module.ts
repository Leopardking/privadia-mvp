import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { MODULE_ROUTES,MODULE_COMPONENTS } from './dashboard.routes';

@NgModule({
    imports: [
        BrowserModule,
        Ng2AutoCompleteModule,
        Ng2CloudinaryModule,
        FileUploadModule,
        RouterModule.forRoot(MODULE_ROUTES)
        // RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ]
})

export class DashboardModule{}
