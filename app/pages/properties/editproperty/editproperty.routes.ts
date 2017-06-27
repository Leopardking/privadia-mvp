import { Route } from '@angular/router';
import {EditpropertyComponent} from "./editproperty.component";

export const MODULE_ROUTES: Route[] =[
    { path: '', component: EditpropertyComponent, pathMatch: 'full'}
];

export const MODULE_COMPONENTS = [
    EditpropertyComponent,
];
