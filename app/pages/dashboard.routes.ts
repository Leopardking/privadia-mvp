import { Route, RouterModule } from '@angular/router';
import {AuthGuard} from "../providers/common/auth.guard";
import { HomeComponent } from './home/home.component';

import { VillaComponent } from '../components/villa/villa.component';
import { MetafilterComponent } from '../components/metafilter/metafilter.component';

export const MODULE_ROUTES: Route[] =[
	//{ path: '', pathMatch: 'full' },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent/*, canActivate: [AuthGuard]*/ },
    { path: 'booking', loadChildren: 'app/pages/booking/booking.module#BookingModule'/*, canActivate: [AuthGuard]*/ },
    { path: 'properties', loadChildren: 'app/pages/properties/properties.module#PropertiesModule'/*, canActivate: [AuthGuard]*/ },
];

export const MODULE_COMPONENTS = [
    HomeComponent,
    VillaComponent,
    MetafilterComponent,
];
