import { NgModule } from '@angular/core';
import {InputfieldComponent} from "./input-field/input-field.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SingleSelectfieldComponent} from "./single-select-field/single-select.component";
import {DatetimefieldComponent} from "./datetimepicker-field/datetimepicker-field.component";
import {SelectfieldComponent} from "./select-field/select.component";
import {SelectTagsFieldComponent} from "./select-tags-field/select-tags.component";

@NgModule({
    declarations: [
        InputfieldComponent,
        SingleSelectfieldComponent,
        DatetimefieldComponent,
        SelectfieldComponent,
        SelectTagsFieldComponent
    ],
    imports: [ CommonModule, FormsModule, ReactiveFormsModule],
    exports: [
        InputfieldComponent,
        SingleSelectfieldComponent,
        DatetimefieldComponent,
        SelectfieldComponent,
        SelectTagsFieldComponent
    ]
})
export class FormFieldsModule{}