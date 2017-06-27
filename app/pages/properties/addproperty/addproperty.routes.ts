import { Route } from '@angular/router';
import {AddpropertyComponent} from "./addproperty.component";


export const MODULE_ROUTES: Route[] =[
    { path: '', component: AddpropertyComponent, pathMatch: 'full'}
];

export const MODULE_COMPONENTS = [
    AddpropertyComponent,
];
