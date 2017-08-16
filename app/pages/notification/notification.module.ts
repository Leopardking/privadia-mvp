import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

/**
 *  Providers
 */

/**
 *  Components
 */
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NotificationRoutingModule,
        RouterModule,
    ],
    declarations: [
        NotificationComponent,
    ],
})
export class NotificationModule {}
