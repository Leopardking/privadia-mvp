import { Route } from '@angular/router';

import {AddpropertyComponent} from "../addproperty/addproperty.component";
import {EditpropertyComponent} from "../editproperty/editproperty.component";
import {PropertyinfoComponent} from "../propertyinfo/propertyinfo.component";
import {PropertyimageoComponent} from "../propertyimage/propertyimage.component";
import {PropertymarketingComponent} from "../marketing/propertymarketing.component";
import {MetafilterheadingComponent} from "../../../components/meta-filter-heading/meta-filter-heading.component";
import {PropertyMetafilterComponent} from "../../../components/meta-filter-components/metafilter.component";

export const MODULE_ROUTES: Route[] =[
    { path: '', component: AddpropertyComponent },
    { path: ':id', component: EditpropertyComponent },
    /*
    { path: 'addproperty', children: [
        { path: '', component: AddpropertyComponent },
        //{ path: ':id', component: EditpropertyComponent },
        //{ path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
        //{ path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
    ]},
    */
];

export const MODULE_COMPONENTS = [
    AddpropertyComponent,
    EditpropertyComponent,
    PropertyMetafilterComponent,
    MetafilterheadingComponent,
    PropertyinfoComponent,
    PropertyimageoComponent,
    PropertymarketingComponent,
];
