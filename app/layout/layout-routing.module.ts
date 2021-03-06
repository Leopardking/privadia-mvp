import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: '/app/pages/dashboard/dashboard.module#DashboardModule' },
            { path: 'booking', loadChildren: 'app/pages/booking/booking.module#BookingModule' },
            { path: 'properties', loadChildren: 'app/pages/properties/properties.module#PropertiesModule' },
            { path: 'notifications', loadChildren: 'app/pages/notification/notification.module#NotificationModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
