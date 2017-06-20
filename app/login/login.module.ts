import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../providers/login/login.service";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginComponent],
    providers:[ LoginService ]
})
export class LoginModule { }
