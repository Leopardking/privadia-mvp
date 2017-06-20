"use strict";
var auth_guard_1 = require("../providers/common/auth.guard");
var home_component_1 = require('./home/home.component');
var villa_component_1 = require('../components/villa/villa.component');
var metafilter_component_1 = require('../components/metafilter/metafilter.component');
exports.MODULE_ROUTES = [
    //{ path: '', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'booking', loadChildren: 'app/pages/booking/booking.module#BookingModule', canActivate: [auth_guard_1.AuthGuard] },
    { path: 'properties', loadChildren: 'app/pages/properties/properties.module#PropertiesModule', canActivate: [auth_guard_1.AuthGuard] },
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    villa_component_1.VillaComponent,
    metafilter_component_1.MetafilterComponent,
];
//# sourceMappingURL=dashboard.routes.js.map