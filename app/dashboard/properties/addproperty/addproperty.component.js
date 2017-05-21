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
var homeservice_1 = require('../../../../app/services/homeservice');
var AddpropertyComponent = (function () {
    function AddpropertyComponent(mainService) {
        this.mainService = mainService;
        this.reading = false;
        this.datatableInited = false;
        this.properties = [];
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    AddpropertyComponent.prototype.ngOnInit = function () {
        this.metafilters = [];
        for (var i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }
        this.contacts = [];
    };
    AddpropertyComponent.prototype.subfilterChange = function (e) {
        var optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
        this.metafilters[optionId] = !this.metafilters[optionId];
    };
    AddpropertyComponent.prototype.finished = function () {
        //$(".selectpicker").selectpicker();
        return "";
    };
    AddpropertyComponent.prototype.showAddContact = function () {
        this.contacts.push({
            id: this.contacts.length == 0 ? 0 : this.contacts[this.contacts.length - 1].id + 1,
            jobTitle: "",
            firstName: "",
            lastName: "",
            email: "",
            telephone: ""
        });
    };
    AddpropertyComponent.prototype.removeContact = function (id) {
        var i;
        for (i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == id) {
                break;
            }
        }
        this.contacts.splice(i, 1);
    };
    AddpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'addproperty.component.html',
            styleUrls: ['addproperty.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService])
    ], AddpropertyComponent);
    return AddpropertyComponent;
}());
exports.AddpropertyComponent = AddpropertyComponent;
//# sourceMappingURL=addproperty.component.js.map