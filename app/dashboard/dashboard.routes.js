"use strict";
// import { DashboardComponent } from './dashboard.component';
var home_component_1 = require('./home/home.component');
var booking_component_1 = require('./booking/booking.component');
var properties_component_1 = require('./properties/properties.component');
var addproperty_component_1 = require('./properties/addproperty/addproperty.component');
var villa_component_1 = require('./components/villa/villa.component');
var metafilter_component_1 = require('./components/metafilter/metafilter.component');
// property components
var propertyinfo_component_1 = require('./properties/propertyinfo/propertyinfo.component');
var propertyimage_component_1 = require('./properties/propertyimage/propertyimage.component');
var propertymarketing_component_1 = require('./properties/marketing/propertymarketing.component');
var metafilterheading_component_1 = require('./properties/metafilterheading/metafilterheading.component');
var metafilter_component_2 = require('./properties/metafiltercomponents/metafilter.component');
//
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'booking', component: booking_component_1.BookingComponent },
    { path: 'properties', component: properties_component_1.PropertiesComponent },
    { path: 'properties/addproperty', component: addproperty_component_1.AddpropertyComponent }
];
//
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    villa_component_1.VillaComponent,
    booking_component_1.BookingComponent,
    metafilter_component_1.MetafilterComponent,
    properties_component_1.PropertiesComponent,
    addproperty_component_1.AddpropertyComponent,
    propertyinfo_component_1.PropertyinfoComponent,
    propertyimage_component_1.PropertyimageoComponent,
    propertymarketing_component_1.PropertymarketingComponent,
    metafilterheading_component_1.MetafilterheadingComponent,
    metafilter_component_2.PropertyMetafilterComponent,
];
//# sourceMappingURL=dashboard.routes.js.map