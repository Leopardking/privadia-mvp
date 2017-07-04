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
var SelectfieldComponent = (function () {
    function SelectfieldComponent(builder) {
        this.builder = builder;
    }
    SelectfieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        var selectQuery = $(".selectpicker");
        setTimeout(function () {
            selectQuery.selectpicker({
                selectedTextFormat: 'static'
            });
            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.inner').perfectScrollbar();
            });
        }, 10);
        this.regions.forEach(function () {
            _this.field.push(new forms_1.FormControl());
        });
    };
    SelectfieldComponent.prototype.regionChange = function (e) {
        this.field.reset();
        this.field.patchValue(this.metafiltersModel);
    };
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], SelectfieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input('regions'), 
        __metadata('design:type', Object)
    ], SelectfieldComponent.prototype, "regions", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormArray)
    ], SelectfieldComponent.prototype, "field", void 0);
    SelectfieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-field-cmp',
            templateUrl: 'select.component.html',
            styleUrls: ['select.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], SelectfieldComponent);
    return SelectfieldComponent;
}());
exports.SelectfieldComponent = SelectfieldComponent;
//# sourceMappingURL=select.component.js.map