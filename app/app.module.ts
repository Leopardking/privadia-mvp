import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';

import {AuthGuard} from "./shared/guard/auth.guard";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    declarations: [ AppComponent ],
    imports:      [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    providers: [
        AuthGuard,
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
