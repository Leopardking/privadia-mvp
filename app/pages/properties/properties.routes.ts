import { Route } from '@angular/router';

import { PropertiesComponent } from './properties.component';

export const MODULE_ROUTES: Route[] =[
    { path: '', children: [
        { path: '', component: PropertiesComponent },
        { path: 'addproperty', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        { path: 'editproperty', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        //{ path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
        //{ path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
    ]},
];

export const MODULE_COMPONENTS = [
    PropertiesComponent,
];
