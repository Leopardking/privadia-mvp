import { Route } from '@angular/router';

import { PropertiesComponent } from './properties.component';
import { SetratesComponent } from './setrates/setrates.component';
import { AvailabilityComponent } from './availability/availability.component';
import {CalendarComponent} from "../../components/calendar/calendar.component";

export const MODULE_ROUTES: Route[] =[
    { path: '', children: [
        { path: '', component: PropertiesComponent },
        { path: 'add', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        { path: 'edit', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        // { path: 'setrates', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        { path: 'view', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        { path: 'setrates/:id', component: SetratesComponent },
        { path: 'availability/:id', component: AvailabilityComponent }
        //{ path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
        //{ path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
    ]},
];

export const MODULE_COMPONENTS = [
    PropertiesComponent,
    SetratesComponent,
    AvailabilityComponent,
    CalendarComponent
];
