import { Route, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login/login.component';

//
export const MODULE_ROUTES: Route[] =[
	{ path: 'login', component: LoginComponent },
]
//
export const MODULE_COMPONENTS = [
    LoginComponent,
]
