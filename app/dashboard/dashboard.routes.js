"use strict";
// import { DashboardComponent } from './dashboard.component';
var home_component_1 = require('./home/home.component');
var villa_component_1 = require('./components/villa/villa.component');
//
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: home_component_1.HomeComponent },
];
//
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    villa_component_1.VillaComponent,
];
//# sourceMappingURL=dashboard.routes.js.map