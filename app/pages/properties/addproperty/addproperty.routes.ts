import { Route } from '@angular/router';
import {EditpropertyComponent} from "../editproperty/editproperty.component";
import {PropertyinfoComponent} from "../propertyinfo/propertyinfo.component";
import {PropertyimageoComponent} from "../propertyimage/propertyimage.component";
import {PropertymarketingComponent} from "../marketing/propertymarketing.component";
import {MetafilterheadingComponent} from "../metafilterheading/metafilterheading.component";
import {PropertyMetafilterComponent} from "../metafiltercomponents/metafilter.component";
import {AddpropertyComponent} from "./addproperty.component";


export const MODULE_ROUTES: Route[] =[
    { path: '', component: AddpropertyComponent, pathMatch: 'full'}
];

export const MODULE_COMPONENTS = [
    PropertyMetafilterComponent,
    AddpropertyComponent,
    MetafilterheadingComponent,
    PropertyinfoComponent,
    PropertyimageoComponent,
    PropertymarketingComponent,
];
