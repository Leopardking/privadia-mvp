"use strict";
var home_component_1 = require('./home/home.component');
var villa_component_1 = require('../components/villa/villa.component');
var metafilter_component_1 = require('../components/metafilter/metafilter.component');
exports.MODULE_ROUTES = [
    //{ path: '', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent /*, canActivate: [AuthGuard]*/ },
    { path: 'booking', loadChildren: 'app/pages/booking/booking.module#BookingModule' /*, canActivate: [AuthGuard]*/ },
    { path: 'properties', loadChildren: 'app/pages/properties/properties.module#PropertiesModule' /*, canActivate: [AuthGuard]*/ },
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    villa_component_1.VillaComponent,
    metafilter_component_1.MetafilterComponent,
];
//# sourceMappingURL=_dashboard.routes.js.map