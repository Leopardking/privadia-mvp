import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login/login.component';

import { MODULE_ROUTES,MODULE_COMPONENTS } from './users.routes';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers: []
})

export class UsersModule{}
