import { Route, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';
import { EnquiriesComponent } from './enquiries/enquiries.component'

export const MODULE_ROUTES: Route[] =[
    { path: '', children: [
        { path: '', redirectTo: 'forthcoming', pathMatch: 'full' },
        { path: 'tentative', component: BookingComponent },
        { path: 'tentative', loadChildren: 'app/pages/booking/booking-id/booking-id.module#BookingIdModule' },
        { path: 'confirmed', component: BookingComponent },
        { path: 'confirmed', loadChildren: 'app/pages/booking/booking-id/booking-id.module#BookingIdModule' },
        { path: 'enquiry', component: EnquiriesComponent },
        { path: 'enquiry', loadChildren: 'app/pages/booking/enquiry/enquiry.module#EnquiryModule' }
    ]},
];

export const MODULE_COMPONENTS = [
    BookingComponent, EnquiriesComponent
];
