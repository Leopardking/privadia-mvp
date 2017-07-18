import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { ExtendedHttpService } from './providers/extendedHttp/extended-http.service';

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
        {provide: Http, useClass: ExtendedHttpService}
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
