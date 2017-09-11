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
var forms_1 = require("@angular/forms");
var InputfieldComponent = (function () {
    function InputfieldComponent() {
        this.staticField = false;
        this.inputMask = false;
    }
    InputfieldComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], InputfieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input('errorForm'), 
        __metadata('design:type', Object)
    ], InputfieldComponent.prototype, "errorForm", void 0);
    __decorate([
        core_1.Input('static'), 
        __metadata('design:type', Boolean)
    ], InputfieldComponent.prototype, "staticField", void 0);
    __decorate([
        core_1.Input('field'), 
        __metadata('design:type', forms_1.FormControl)
    ], InputfieldComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input('inputMask'), 
        __metadata('design:type', Object)
    ], InputfieldComponent.prototype, "inputMask", void 0);
    InputfieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'input-field-cmp',
            templateUrl: 'input-field.component.html',
            styleUrls: ['input-field.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], InputfieldComponent);
    return InputfieldComponent;
}());
exports.InputfieldComponent = InputfieldComponent;
//# sourceMappingURL=input-field.component.js.map