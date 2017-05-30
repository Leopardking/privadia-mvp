import { Route, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { EditpropertyComponent } from './editproperty/editproperty.component';


import { PropertiesComponent } from './properties.component';


//
export const MODULE_ROUTES: Route[] =[
    // { path: '', component: PropertiesComponent, pathMatch: 'full'}
    { path: '', children: [
        { path: '', component: PropertiesComponent },
        { path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
        { path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
        // { path: 'addproperty', component: AddpropertyComponent },
        // { path: 'editproperty/:id', component: EditpropertyComponent }
    ]},
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    // { path: 'booking', component: BookingComponent },
    // { path: 'properties', component: PropertiesComponent },
    // { path: 'addproperty', component: AddpropertyComponent },
    // { path: 'editproperty/:id', component: EditpropertyComponent }
]


//
export const MODULE_COMPONENTS = [
    PropertiesComponent,
    // AddpropertyComponent,
    // EditpropertyComponent,
]
