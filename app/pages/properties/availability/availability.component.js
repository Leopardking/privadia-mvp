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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var properties_service_1 = require('../../../providers/properties/properties.service');
var login_service_1 = require("../../../providers/login/login.service");
var AvailabilityComponent = (function () {
    function AvailabilityComponent(propertiesService, loginService, route) {
        this.propertiesService = propertiesService;
        this.loginService = loginService;
        this.route = route;
        this.UpdateBlock = true;
        this.isCalendarView = true;
    }
    AvailabilityComponent.prototype.ngOnInit = function () {
        this.UpdateTypeList = [
            { Id: 1, Name: 'Internal Booking' },
            { Id: 2, Name: 'External Booking' },
            { Id: 3, Name: 'Owner Present' },
            { Id: 4, Name: 'Not Available for Rent' },
            { Id: 5, Name: 'Other' }
        ];
        this.availabilityForm = new forms_1.FormGroup({
            CheckIn: new forms_1.FormControl('08/16/2017'),
            CheckOut: new forms_1.FormControl('08/18/2017'),
            UpdateType: new forms_1.FormControl({
                Id: 1,
                Name: 'Internal Booking',
            }),
            Notes: new forms_1.FormControl()
        });
        // this.availabilityForm.valueChanges.subscribe(data => {
        //     console.log('Form changes', data);
        //     this.output = data
        // });
    };
    AvailabilityComponent.prototype.autosize = function (e) {
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    };
    AvailabilityComponent.prototype.toggleUpdateBlock = function () {
        this.UpdateBlock = !this.UpdateBlock;
    };
    AvailabilityComponent.prototype.toggleCalendarView = function () {
        this.isCalendarView = !this.isCalendarView;
    };
    AvailabilityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' availability-cmp ',
            templateUrl: 'availability.component.html',
            styleUrls: ['availability.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, login_service_1.LoginService, router_1.ActivatedRoute])
    ], AvailabilityComponent);
    return AvailabilityComponent;
}());
exports.AvailabilityComponent = AvailabilityComponent;
//# sourceMappingURL=availability.component.js.map