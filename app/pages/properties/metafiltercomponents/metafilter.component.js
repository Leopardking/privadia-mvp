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
var PropertyMetafilterComponent = (function () {
    function PropertyMetafilterComponent() {
    }
    PropertyMetafilterComponent.prototype.ngOnInit = function () {
        console.log('metadata', this.metadata);
        this.metafilters = [];
        var control = this.propertyForm.controls['MetaDataTmp'];
        for (var i = 0; i < this.metadata.MetaDataSubTypes.length; i++) {
            control.addControl('type_' + this.metadata.MetaDataSubTypes[i].Id, new forms_1.FormArray([]));
            var controlSubtype = control.controls['type_' + this.metadata.MetaDataSubTypes[i].Id];
            for (var j = 0; j < this.metadata.MetaDataSubTypes[i].MetaData.length; j++) {
                controlSubtype.push(new forms_1.FormGroup({
                    MetaDataId: new forms_1.FormControl(this.metadata.MetaDataSubTypes[i].MetaData[j].Id),
                    MetaDataName: new forms_1.FormControl(this.metadata.MetaDataSubTypes[i].MetaData[j].Name),
                    Available: new forms_1.FormControl(false),
                }));
            }
        }
    };
    PropertyMetafilterComponent.prototype.subfilterChange = function (e) {
        var optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
        var optionName = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-name') : e.target.parentElement.parentElement.getAttribute('option-name');
        var optionSubtype = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-subtype') : e.target.parentElement.parentElement.getAttribute('option-subtype');
        var optionIndex = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-index') : e.target.parentElement.parentElement.getAttribute('option-index');
        this.metafilters[optionId] = !this.metafilters[optionId];
        var control = this.propertyForm.controls['MetaDataTmp'];
        var controlSubtype = control.controls['type_' + optionSubtype];
        controlSubtype.controls[optionIndex].setValue({
            MetaDataId: optionId,
            MetaDataName: optionName,
            Available: !controlSubtype.controls[optionIndex].value.Available,
        });
        console.log('Control metadata after', controlSubtype.controls[optionIndex].value.Available);
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