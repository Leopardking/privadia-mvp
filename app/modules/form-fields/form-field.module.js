"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var input_field_component_1 = require("./input-field/input-field.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var single_select_component_1 = require("./single-select-field/single-select.component");
var datetimepicker_field_component_1 = require("./datetimepicker-field/datetimepicker-field.component");
var select_component_1 = require("./select-field/select.component");
var select_tags_component_1 = require("./select-tags-field/select-tags.component");
var FormFieldsModule = (function () {
    function FormFieldsModule() {
    }
    FormFieldsModule = __decorate([
        core_1.NgModule({
            declarations: [
                input_field_component_1.InputfieldComponent,
                single_select_component_1.SingleSelectfieldComponent,
                datetimepicker_field_component_1.DatetimefieldComponent,
                select_component_1.SelectfieldComponent,
                select_tags_component_1.SelectTagsFieldComponent
            ],
            imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            exports: [
                input_field_component_1.InputfieldComponent,
                single_select_component_1.SingleSelectfieldComponent,
                datetimepicker_field_component_1.DatetimefieldComponent,
                select_component_1.SelectfieldComponent,
                select_tags_component_1.SelectTagsFieldComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FormFieldsModule);
    return FormFieldsModule;
}());
exports.FormFieldsModule = FormFieldsModule;
//# sourceMappingURL=form-field.module.js.map