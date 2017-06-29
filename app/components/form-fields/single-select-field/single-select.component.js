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
var SingleSelectfieldComponent = (function () {
    function SingleSelectfieldComponent() {
        this.dataList = [];
    }
    SingleSelectfieldComponent.prototype.ngOnInit = function () {
        var selectQuery = $(".custompicker");
        selectQuery.selectpicker();
    };
    SingleSelectfieldComponent.prototype.ngAfterViewInit = function () {
        var selectQuery = $(".custompicker");
        selectQuery.selectpicker('render');
        selectQuery.selectpicker('refresh');
        selectQuery.on('show.bs.select', function (e) {
            $('.dropdown-menu.inner').perfectScrollbar('update');
        });
    };
    __decorate([
        core_1.Input('field'), 
        __metadata('design:type', forms_1.FormGroup)
    ], SingleSelectfieldComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input('dataList'), 
        __metadata('design:type', Object)
    ], SingleSelectfieldComponent.prototype, "dataList", void 0);
    __decorate([
        core_1.Input('options'), 
        __metadata('design:type', Object)
    ], SingleSelectfieldComponent.prototype, "options", void 0);
    SingleSelectfieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'singleselect-field-cmp',
            templateUrl: 'single-select.component.html',
            styleUrls: ['single-select.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SingleSelectfieldComponent);
    return SingleSelectfieldComponent;
}());
exports.SingleSelectfieldComponent = SingleSelectfieldComponent;
//# sourceMappingURL=single-select.component.js.map