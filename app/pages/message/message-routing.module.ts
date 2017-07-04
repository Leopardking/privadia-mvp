import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', component: MessageComponent },
        { path: 'dialogs', loadChildren: 'app/pages/message/enquiry/enquiry.module#EnquiryModule' }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
