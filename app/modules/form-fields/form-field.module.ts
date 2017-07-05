import { NgModule } from '@angular/core';
import {InputfieldComponent} from "./input-field/input-field.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SingleSelectfieldComponent} from "./single-select-field/single-select.component";
import {DatetimefieldComponent} from "./datetimepicker-field/datetimepicker-field.component";

@NgModule({
    declarations: [InputfieldComponent, SingleSelectfieldComponent, DatetimefieldComponent],
    imports: [ CommonModule, ReactiveFormsModule],
    exports: [InputfieldComponent, SingleSelectfieldComponent, DatetimefieldComponent]
})
export class FormFieldsModule{}