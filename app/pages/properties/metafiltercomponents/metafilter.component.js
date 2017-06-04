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
        this.metafilters = [];
        for (var i = 0; i < this.metadata.length; i++) {
            for (var j = 0; j < this.metadata[i].MetaData.length; j++) {
                this.metafilters[this.metadata[i].MetaData[j]] = false;
            }
        }
    };
    PropertyMetafilterComponent.prototype.subfilterChange = function (e) {
        var optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
        this.metafilters[optionId] = !this.metafilters[optionId];
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