import { Route, RouterModule } from '@angular/router';
import { BookingIdComponent } from './booking-id.component';

export const MODULE_ROUTES: Route[] =[
    { path: ':id', component: BookingIdComponent }
];

export const MODULE_COMPONENTS = [
    BookingIdComponent,
];
