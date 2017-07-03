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
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var EnquiryComponent = (function () {
    function EnquiryComponent(enquiryService) {
        this.enquiryService = enquiryService;
    }
    EnquiryComponent.prototype.ngOnInit = function () {
        console.log('Data ', this.data);
    };
    EnquiryComponent.prototype.onSubmit = function (values) {
        console.log('Submit enquiry', values);
        console.log('Valid form ', this.enquiryForm.status);
        if (this.enquiryForm.status === 'INVALID')
            return;
        this.enquiryService.addEnquiry(values).subscribe(function (d) {
            $('#enquiry').modal('hide');
            $.notify({
                icon: "notifications",
                message: "Enquiry Submit Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            console.log('Added Enquiry ', d);
        }, function (e) {
            console.log('Error add enquiry ', e);
        });
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], EnquiryComponent.prototype, "enquiryForm", void 0);
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], EnquiryComponent.prototype, "data", void 0);
    EnquiryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'enquiry-cmp ',
            templateUrl: 'enquiry.component.html',
            styleUrls: ['enquiry.component.css']
        }), 
        __metadata('design:paramtypes', [enquiry_service_1.EnquiryService])
    ], EnquiryComponent);
    return EnquiryComponent;
}());
exports.EnquiryComponent = EnquiryComponent;
//# sourceMappingURL=enquiry.component.js.map