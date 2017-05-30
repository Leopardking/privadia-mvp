import { Route } from '@angular/router';
import {EditpropertyComponent} from "./editproperty.component";
import {PropertyinfoComponent} from "../propertyinfo/propertyinfo.component";
import {PropertyimageoComponent} from "../propertyimage/propertyimage.component";
import {PropertymarketingComponent} from "../marketing/propertymarketing.component";
import {MetafilterheadingComponent} from "../metafilterheading/metafilterheading.component";
import {PropertyMetafilterComponent} from "../metafiltercomponents/metafilter.component";


export const MODULE_ROUTES: Route[] =[
    { path: '', component: EditpropertyComponent, pathMatch: 'full'}
];

export const MODULE_COMPONENTS = [
    PropertyMetafilterComponent,
    EditpropertyComponent,
    MetafilterheadingComponent,
    PropertyinfoComponent,
    PropertyimageoComponent,
    PropertymarketingComponent,
];
