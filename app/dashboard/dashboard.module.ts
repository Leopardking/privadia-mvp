import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { MODULE_ROUTES,MODULE_COMPONENTS } from './dashboard.routes';

@NgModule({
    imports: [
        BrowserModule,
        Ng2AutoCompleteModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ]
})

export class DashboardModule{}
