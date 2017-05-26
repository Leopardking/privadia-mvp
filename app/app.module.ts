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

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MainService } from './providers/homeservice';
import { LoginService } from './providers/login/login.service';
import { PropertiesService } from './providers/properties/properties.service';
import { BookingService } from './providers/booking/booking.service';

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
