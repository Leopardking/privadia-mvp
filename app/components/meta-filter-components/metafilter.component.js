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
var _ = require('lodash');
var PropertyMetafilterComponent = (function () {
    function PropertyMetafilterComponent() {
    }
    PropertyMetafilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.metafilters = [];
        var values = this.propertyForm.controls['MetaData'].value;
        var control = this.propertyForm.controls['MetaDataTmp'];
        var _loop_1 = function(i) {
            control.addControl('type_' + this_1.metadata.MetaDataSubTypes[i].Id, new forms_1.FormArray([]));
            var controlSubtype = control.controls['type_' + this_1.metadata.MetaDataSubTypes[i].Id];
            var _loop_2 = function(j) {
                var obj = _.find(values, function (el) {
                    return el['MetaDataId'] == _this.metadata.MetaDataSubTypes[i].MetaData[j].Id;
                });
                controlSubtype.push(new forms_1.FormGroup({
                    MetaDataId: new forms_1.FormControl(this_1.metadata.MetaDataSubTypes[i].MetaData[j].Id),
                    MetaDataName: new forms_1.FormControl(this_1.metadata.MetaDataSubTypes[i].MetaData[j].Name),
                    Available: new forms_1.FormControl(obj && obj['Available'] || false),
                }));
                this_1.metafilters[this_1.metadata.MetaDataSubTypes[i].MetaData[j].Id] = obj && obj['Available'] || false;
            };
            for (var j = 0; j < this_1.metadata.MetaDataSubTypes[i].MetaData.length; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.metadata.MetaDataSubTypes.length; i++) {
            _loop_1(i);
        }
        setTimeout(function () {
            $(".selectpicker").selectpicker({
                selectedTextFormat: 'static'
            });
        }, 1000);
        $('.dropdown-menu.inner').perfectScrollbar();
    };
    __decorate([
        core_1.Input('metadata'), 
        __metadata('design:type', Object)
    ], PropertyMetafilterComponent.prototype, "metadata", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertyMetafilterComponent.prototype, "propertyForm", void 0);
    PropertyMetafilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' property-metafilter-cmp',
            templateUrl: 'metafilter.component.html',
            styleUrls: ['metafilter.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PropertyMetafilterComponent);
    return PropertyMetafilterComponent;
}());
exports.PropertyMetafilterComponent = PropertyMetafilterComponent;
//# sourceMappingURL=metafilter.component.js.map