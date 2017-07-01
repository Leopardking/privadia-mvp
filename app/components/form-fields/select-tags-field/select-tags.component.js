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
var login_service_1 = require("../../../providers/login/login.service");
var SelectTagsFieldComponent = (function () {
    function SelectTagsFieldComponent(loginService) {
        this.loginService = loginService;
    }
    SelectTagsFieldComponent.prototype.ngOnInit = function () {
        this.permission = !this.loginService.getPermission('Properties/Put');
        var selectQuery = $(".selectpicker");
        setTimeout(function () {
            selectQuery.selectpicker({
                selectedTextFormat: 'static'
            });
            $('.dropdown-menu.open .inner').perfectScrollbar();
            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.open .inner').perfectScrollbar('update');
            });
        }, 1);
    };
    SelectTagsFieldComponent.prototype.subfilterModelChange = function (e, type) {
        var controlSubtype = this.field.controls[type];
        controlSubtype.controls.forEach(function (key, value) {
            e.find(function (el) {
                if (el.MetaDataId == key.value.MetaDataId) {
                    key.setValue({
                        MetaDataId: el.MetaDataId,
                        MetaDataName: el.MetaDataName,
                        Available: !el.Available,
                    });
                }
            });
        });
    };
    SelectTagsFieldComponent.prototype.removeMetafilter = function (e) {
        var controlSubtype = this.field.controls[e.type];
        controlSubtype.controls[e.index].setValue({
            MetaDataId: controlSubtype.controls[e.index].value.MetaDataId,
            MetaDataName: controlSubtype.controls[e.index].value.MetaDataName,
            Available: !controlSubtype.controls[e.index].value.Available,
        });
    };
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], SelectTagsFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input('subtype'), 
        __metadata('design:type', Object)
    ], SelectTagsFieldComponent.prototype, "subtype", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], SelectTagsFieldComponent.prototype, "field", void 0);
    SelectTagsFieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-tags-field-cmp',
            templateUrl: 'select-tags.component.html',
            styleUrls: ['select-tags.component.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], SelectTagsFieldComponent);
    return SelectTagsFieldComponent;
}());
exports.SelectTagsFieldComponent = SelectTagsFieldComponent;
//# sourceMappingURL=select-tags.component.js.map