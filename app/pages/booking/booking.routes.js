"use strict";
var booking_component_1 = require('./booking.component');
//
exports.MODULE_ROUTES = [
    // { path: '', component: PropertiesComponent, pathMatch: 'full'}
    { path: '', children: [
            { path: '', component: booking_component_1.BookingComponent },
            { path: 'test', component: booking_component_1.BookingComponent },
            // { path: 'addproperty', component: AddpropertyComponent },
            { path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
            { path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
        ] },
];
//
exports.MODULE_COMPONENTS = [
    booking_component_1.BookingComponent,
];
//# sourceMappingURL=booking.routes.js.map