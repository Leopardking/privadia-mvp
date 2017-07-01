import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

const routes: Routes = [
    { path: '', component: MessageComponent },
    { path: 'dialogs', component: EnquiryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }