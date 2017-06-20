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
/*
@NgModule({
    imports:      [
        BrowserModule,
        DashboardModule,
        UsersModule,
        // SidebarModule,
        // NavbarModule,
        // FooterModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    declarations: [ AppComponent, DashboardComponent, UsersComponent ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy },
        // MainService,
        LoginService,
        // PropertiesService,
        // BookingService,
        AuthGuard,
        ...AUTH_PROVIDERS
    ],
    bootstrap:    [ AppComponent ]
})
*/
export class AppModule { }
