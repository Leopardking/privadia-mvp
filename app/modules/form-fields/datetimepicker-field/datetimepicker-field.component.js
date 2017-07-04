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
var initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");
var DatetimefieldComponent = (function () {
    function DatetimefieldComponent() {
    }
    DatetimefieldComponent.prototype.ngOnInit = function () {
        initDatetimepickers();
    };
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], DatetimefieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input('classes'), 
        __metadata('design:type', Object)
    ], DatetimefieldComponent.prototype, "classes", void 0);
    __decorate([
        core_1.Input('field'), 
        __metadata('design:type', forms_1.FormControl)
    ], DatetimefieldComponent.prototype, "field", void 0);
    DatetimefieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'datetimepicker-field-cmp',
            templateUrl: 'datetimepicker-field.component.html',
            styleUrls: ['datetimepicker-field.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DatetimefieldComponent);
    return DatetimefieldComponent;
}());
exports.DatetimefieldComponent = DatetimefieldComponent;
//# sourceMappingURL=datetimepicker-field.component.js.map