import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './pages/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

import { DashboardModule } from './pages/dashboard.module';
import { UsersModule } from './pages/users/users.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { FooterModule } from './components/shared/footer/footer.module';
import { NavbarModule} from './components/shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MainService } from './providers/homeservice';
import { LoginService } from './providers/login/login.service';
import { PropertiesService } from './providers/properties/properties.service';
import { BookingService } from './providers/booking/booking.service';
//import {AuthGuard} from "./providers/common/auth.guard";

import {AuthGuard} from "./shared/guard/auth.guard";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    declarations: [ AppComponent ],
    imports:      [
        BrowserModule,
        AppRoutingModule,
        // DashboardModule,
        // UsersModule,
        // SidebarModule,
        // NavbarModule,
        // FooterModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    providers: [
        // {provide: LocationStrategy, useClass: PathLocationStrategy },
        // MainService,
        // LoginService,
        // PropertiesService,
        // BookingService,
        AuthGuard,
        //...AUTH_PROVIDERS
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
