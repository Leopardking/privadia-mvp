import { Route, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { VillaComponent } from './components/villa/villa.component';

//
export const MODULE_ROUTES: Route[] =[
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent },
]
//
export const MODULE_COMPONENTS = [
    HomeComponent,
    VillaComponent,
]
