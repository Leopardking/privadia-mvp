import { Route, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';

export const MODULE_ROUTES: Route[] =[
    { path: '', children: [
        { path: '', component: BookingComponent },
        { path: 'forthcoming', loadChildren: 'app/pages/booking/booking-id/booking-id.module#BookingIdModule' }
    ]},
];

export const MODULE_COMPONENTS = [
    BookingComponent,
];
