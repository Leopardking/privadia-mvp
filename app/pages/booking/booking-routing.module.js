"use strict";
var booking_component_1 = require('./booking.component');
var enquiries_component_1 = require('./enquiries/enquiries.component');
exports.MODULE_ROUTES = [
    { path: '', children: [
            { path: '', redirectTo: 'forthcoming', pathMatch: 'full' },
            { path: 'forthcoming', component: booking_component_1.BookingComponent },
            { path: 'forthcoming', loadChildren: 'app/pages/booking/booking-id/booking-id.module#BookingIdModule' },
            { path: 'enquiry', component: enquiries_component_1.EnquiriesComponent },
            { path: 'enquiry', loadChildren: 'app/pages/booking/enquiry/enquiry.module#EnquiryModule' }
        ] },
];
exports.MODULE_COMPONENTS = [
    booking_component_1.BookingComponent, enquiries_component_1.EnquiriesComponent
];
//# sourceMappingURL=booking-routing.module.js.map