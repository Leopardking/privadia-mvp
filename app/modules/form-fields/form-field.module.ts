import { NgModule } from '@angular/core';
import {InputfieldComponent} from "./input-field/input-field.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [InputfieldComponent],
    imports: [ CommonModule, ReactiveFormsModule],
    exports: [InputfieldComponent]
})
export class FormFieldsModule{}