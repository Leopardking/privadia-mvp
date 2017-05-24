import { Route, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { PropertiesComponent } from './properties/properties.component';
import { AddpropertyComponent } from './properties/addproperty/addproperty.component';


import { VillaComponent } from './components/villa/villa.component';
import { MetafilterComponent } from './components/metafilter/metafilter.component';


// property components
import { PropertyinfoComponent } from './properties/propertyinfo/propertyinfo.component';
import { PropertyimageoComponent } from './properties/propertyimage/propertyimage.component';
import { PropertymarketingComponent } from './properties/marketing/propertymarketing.component';
import { MetafilterheadingComponent } from './properties/metafilterheading/metafilterheading.component';
import { PropertyMetafilterComponent } from './properties/metafiltercomponents/metafilter.component';



//
export const MODULE_ROUTES: Route[] =[
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'properties', component: PropertiesComponent },
    { path: 'properties/addproperty', component: AddpropertyComponent }
]
//
export const MODULE_COMPONENTS = [
    HomeComponent,
    VillaComponent,
    BookingComponent,
    MetafilterComponent,
    PropertiesComponent,
    AddpropertyComponent,
    PropertyinfoComponent,
    PropertyimageoComponent,
    PropertymarketingComponent,
    MetafilterheadingComponent,
    PropertyMetafilterComponent,
]
