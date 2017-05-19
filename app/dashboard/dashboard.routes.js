"use strict";
// import { DashboardComponent } from './dashboard.component';
var home_component_1 = require('./home/home.component');
var booking_component_1 = require('./booking/booking.component');
var properties_component_1 = require('./properties/properties.component');
var villa_component_1 = require('./components/villa/villa.component');
var metafilter_component_1 = require('./components/metafilter/metafilter.component');
//
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'booking', component: booking_component_1.BookingComponent },
    { path: 'properties', component: properties_component_1.PropertiesComponent }
];
//
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    villa_component_1.VillaComponent,
    booking_component_1.BookingComponent,
    metafilter_component_1.MetafilterComponent,
    properties_component_1.PropertiesComponent,
];
//# sourceMappingURL=dashboard.routes.js.map