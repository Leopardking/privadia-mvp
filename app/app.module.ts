import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MainService } from './services/homeservice';
import { LoginService } from './services/login/login.service';
import { PropertiesService } from './services/properties/properties.service';
import { BookingService } from './services/booking/booking.service';

@NgModule({
    imports:      [
        BrowserModule,
        DashboardModule,
        UsersModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    declarations: [ AppComponent, DashboardComponent, UsersComponent ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy },
        MainService, LoginService, PropertiesService, BookingService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
