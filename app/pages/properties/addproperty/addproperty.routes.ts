import { Route, RouterModule } from '@angular/router';
import { AddpropertyComponent } from './addproperty.component';
import {PropertyimageoComponent} from "../propertyimage/propertyimage.component";
import {PropertyinfoComponent} from "../propertyinfo/propertyinfo.component";
import {PropertymarketingComponent} from "../marketing/propertymarketing.component";
import {MetafilterheadingComponent} from "../metafilterheading/metafilterheading.component";
import {PropertyMetafilterComponent} from "../metafiltercomponents/metafilter.component";


export const MODULE_ROUTES: Route[] =[
    { path: '', component: AddpropertyComponent, pathMatch: 'full'}
]
//
export const MODULE_COMPONENTS = [
    AddpropertyComponent,
    PropertyimageoComponent,
    // PropertyinfoComponent,
    // PropertymarketingComponent,
    // MetafilterheadingComponent,
    // PropertyMetafilterComponent

]
