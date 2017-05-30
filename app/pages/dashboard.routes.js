"use strict";
// import { DashboardComponent } from './dashboard.component';
var home_component_1 = require('./home/home.component');
// import { BookingComponent } from './booking/booking.component';
// import { PropertiesComponent } from './properties/properties.component';
// import { AddpropertyComponent } from './properties/addproperty/addproperty.component';
// import { EditpropertyComponent } from './properties/editproperty/editproperty.component';
var villa_component_1 = require('../components/villa/villa.component');
var metafilter_component_1 = require('../components/metafilter/metafilter.component');
// property components
// import { PropertyinfoComponent } from './properties/propertyinfo/propertyinfo.component';
// import { PropertyimageoComponent } from './properties/propertyimage/propertyimage.component';
// import { PropertymarketingComponent } from './properties/marketing/propertymarketing.component';
// import { MetafilterheadingComponent } from './properties/metafilterheading/metafilterheading.component';
// import { PropertyMetafilterComponent } from './properties/metafiltercomponents/metafilter.component';
//
exports.MODULE_ROUTES = [
    //{ path: '', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'booking', loadChildren: 'app/pages/booking/booking.module#BookingModule' },
    { path: 'properties', loadChildren: 'app/pages/properties/properties.module#PropertiesModule' },
];
//
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    villa_component_1.VillaComponent,
    metafilter_component_1.MetafilterComponent,
];
//# sourceMappingURL=dashboard.routes.js.map