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
var _ = require("lodash");
var SelectfieldComponent = (function () {
    //private selectQuery = $(".selectpicker");
    function SelectfieldComponent() {
    }
    SelectfieldComponent.prototype.ngOnInit = function () {
        var selectQuery = $(".selectpicker");
        setTimeout(function () {
            selectQuery.selectpicker({
                selectedTextFormat: 'static'
            });
            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.inner').perfectScrollbar();
            });
        }, 10);
    };
    SelectfieldComponent.prototype.regionChange = function (e) {
        var control = this.filterForm.controls['Regions'];
        var arr = $(e.target).val();
        arr.forEach(function (value) {
            var index = _.findIndex(control.value, function (val) { return val == value; });
            return control.push(new forms_1.FormControl(value));
        });
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
        __metadata('design:type', forms_1.FormGroup)
    ], SelectfieldComponent.prototype, "filterForm", void 0);
    SelectfieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-tags-field-cmp',
            templateUrl: 'select-tags.component.html',
            styleUrls: ['select-tags.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SelectfieldComponent);
    return SelectfieldComponent;
}());
exports.SelectfieldComponent = SelectfieldComponent;
//# sourceMappingURL=select-tags.component.js.map