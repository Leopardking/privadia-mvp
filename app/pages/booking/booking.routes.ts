import { Route, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';




//
export const MODULE_ROUTES: Route[] =[

    // { path: '', component: PropertiesComponent, pathMatch: 'full'}

    { path: '', children: [
        { path: '', component: BookingComponent },
        { path: 'test', component: BookingComponent },
        // { path: 'addproperty', component: AddpropertyComponent },
        { path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
        { path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
        //{ path: 'editproperty/:id', component: EditpropertyComponent }
    ]},
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home', component: HomeComponent },
    //{ path: 'booking', component: BookingComponent },
    //{ path: 'properties', component: PropertiesComponent },
    // { path: 'addproperty', component: AddpropertyComponent },
    // { path: 'editproperty/:id', component: EditpropertyComponent }
]


//
export const MODULE_COMPONENTS = [
    BookingComponent,
    // AddpropertyComponent,
    // EditpropertyComponent,
]
