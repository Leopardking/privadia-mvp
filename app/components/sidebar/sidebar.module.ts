import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MainfilterComponent } from './mainfilter/mainfilter.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent, MainfilterComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
