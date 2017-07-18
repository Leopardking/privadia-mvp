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
var helpers_1 = require("../../../helpers/helpers");
var EnquiryComponent = (function () {
    function EnquiryComponent(enquiryService) {
        this.enquiryService = enquiryService;
        this.errorForm = false;
        this.errorsList = {};
    }
    EnquiryComponent.prototype.ngOnInit = function () { };
    EnquiryComponent.prototype.onSubmit = function (values) {
        var _this = this;
        this.enquiryService.addEnquiry(values).subscribe(function (d) {
            _this.errorForm = false;
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
        }, function (e) {
            _this.errorForm = true;
            helpers_1.handlerErrorFieds(e, _this.enquiryForm);
            helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
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