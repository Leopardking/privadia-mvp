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
var PropertymarketingComponent = (function () {
    function PropertymarketingComponent() {
        this.re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    }
    PropertymarketingComponent.prototype.ngOnInit = function () {
    };
    PropertymarketingComponent.prototype.pdfUrlChanged = function (e) {
        this.pdfUrl = e.target.value;
        if (this.pdfUrl != "" && !this.re.test(this.pdfUrl)) {
            $(this.elePdfUrl.nativeElement).parent().addClass('has-error');
        }
        else {
            $(this.elePdfUrl.nativeElement).parent().removeClass('has-error');
        }
    };
    PropertymarketingComponent.prototype.agnecyPackUrl = function (e) {
        this.agencyPackUrl = e.target.value;
        if (this.agencyPackUrl != "" && !this.re.test(this.pdfUrl)) {
            $(this.eleAgencyUrl.nativeElement).parent().addClass('has-error');
        }
        else {
            $(this.eleAgencyUrl.nativeElement).parent().removeClass('has-error');
        }
    };
    PropertymarketingComponent.prototype.getValidation = function () {
        var validate = true;
        if (this.agencyPackUrl != "" && !this.re.test(this.agencyPackUrl)) {
            $(this.eleAgencyUrl.nativeElement).parent().addClass('has-error');
            validate = false;
        }
        else {
            $(this.eleAgencyUrl.nativeElement).parent().removeClass('has-error');
        }
        if (this.pdfUrl != "" && !this.re.test(this.pdfUrl)) {
            $(this.elePdfUrl.nativeElement).parent().addClass('has-error');
            validate = false;
        }
        else {
            $(this.elePdfUrl.nativeElement).parent().removeClass('has-error');
        }
        return validate;
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertymarketingComponent.prototype, "propertyForm", void 0);
    __decorate([
        core_1.ViewChild('pdfUrl'), 
        __metadata('design:type', Object)
    ], PropertymarketingComponent.prototype, "elePdfUrl", void 0);
    __decorate([
        core_1.ViewChild('agencyUrl'), 
        __metadata('design:type', Object)
    ], PropertymarketingComponent.prototype, "eleAgencyUrl", void 0);
    PropertymarketingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertymarketing-cmp',
            templateUrl: 'propertymarketing.component.html',
            styleUrls: ['propertymarketing.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PropertymarketingComponent);
    return PropertymarketingComponent;
}());
exports.PropertymarketingComponent = PropertymarketingComponent;
//# sourceMappingURL=propertymarketing.component.js.map