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
        this.errorForm = false;
        this.errorsList = {};
    }
    EnquiryComponent.prototype.ngOnInit = function () { };
    EnquiryComponent.prototype.onSubmit = function (values) {
        var _this = this;
        console.log('Valid form ', this.enquiryForm.controls['CheckOut'].valid);
        /*
        if(this.enquiryForm.status === 'INVALID')
            return this.errorForm = true;
        */
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
            console.log('Added Enquiry ', d);
        }, function (e) {
            _this.errorForm = true;
            var fileds = Object.keys(e.ModelState || {});
            _this.errorsList = e.ModelState;
            fileds.forEach(function (field) {
                _this.enquiryForm.controls[field].setErrors({ serverError: e.ModelState[field] });
                e.ModelState[field].forEach(function (error) {
                    $.notify({
                        icon: "notifications",
                        message: "Error " + field + " field: " + error
                    }, {
                        type: 'danger',
                        timer: 60000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                });
            });
            console.log('Error ', _this.errorsList);
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