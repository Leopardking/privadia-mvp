"use strict";
var booking_component_1 = require('./booking.component');
exports.MODULE_ROUTES = [
    { path: '', children: [
            { path: '', component: booking_component_1.BookingComponent },
            { path: 'forthcoming', loadChildren: 'app/pages/booking/booking-id/booking-id.module#BookingIdModule' }
        ] },
];
exports.MODULE_COMPONENTS = [
    booking_component_1.BookingComponent,
];
//# sourceMappingURL=booking-routing.module.js.map