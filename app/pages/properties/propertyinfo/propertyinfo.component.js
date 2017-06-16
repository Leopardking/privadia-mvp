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
var platform_browser_1 = require("@angular/platform-browser");
var properties_service_1 = require('../../../providers/properties/properties.service');
var homeservice_1 = require('../../../providers/homeservice');
var forms_1 = require("@angular/forms");
var PropertyinfoComponent = (function () {
    function PropertyinfoComponent(propertyService, mainService, _sanitizer) {
        var _this = this;
        this.propertyService = propertyService;
        this.mainService = mainService;
        this._sanitizer = _sanitizer;
        this.autocompleListFormatter = function (data) {
            var html = "" + data.Name;
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    PropertyinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*
        $('button[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href") // activated tab
            console.log('Target 1',target);
            $(target).tab('show')
            e.preventDefault()
        });
        */
        console.log('this.property mainService', this.mainService.metadata);
        //this.property// = this.getInfo();
        //console.log('Property ', this.property)
        //this.contacts = [];
        //this.bedrooms = [];
        //this.bathrooms = [];
        //this.ownerNames = [];
        //this.regions = [];
        this.ownerName = "";
        this.regionName = "";
        this.owner = {
            Id: '',
            Name: ''
        };
        this.region = {
            Id: '',
            Name: ''
        };
        // description
        this.propertyService.getOwners().subscribe(function (d) {
            _this.owners = d;
            _this.ownerNames = d.map(function (item, i) { return item.Name; });
        }, function (e) { console.log("error: ", e); });
        this.propertyService.getregions().subscribe(function (d) {
            _this.regionArray = d;
            _this.regions = d.map(function (item, i) { return item.Name; });
        }, function (e) { console.log("error: ", e); });
    };
    PropertyinfoComponent.prototype.showAddContact = function () {
        var control = this.propertyForm.controls['Contacts'];
        control.push(new forms_1.FormGroup({
            JobTitle: new forms_1.FormControl(),
            FirstName: new forms_1.FormControl(),
            LastName: new forms_1.FormControl(),
            EmailAddress: new forms_1.FormControl('', forms_1.Validators.pattern('/^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/')),
            Telephone: new forms_1.FormControl(),
        }));
    };
    PropertyinfoComponent.prototype.removeContact = function (i) {
        var control = this.propertyForm.controls['Contacts'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addBedroom = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl(),
            Name: new forms_1.FormControl(),
            PropertyRoomType: new forms_1.FormControl(1),
        }));
    };
    PropertyinfoComponent.prototype.removeBedroom = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addBathroom = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl(),
            Name: new forms_1.FormControl(),
            PropertyRoomType: new forms_1.FormControl(2),
        }));
    };
    PropertyinfoComponent.prototype.removeBathroom = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.regionChanged = function (e) {
        var controlId = this.propertyForm.controls['RegionId'];
        controlId.setValue(e.Id);
        var controlName = this.propertyForm.controls['RegionName'];
        controlName.setValue(e.Name);
        $("#regionName").removeClass('is-empty');
        $("#regionName").removeClass('has-error');
    };
    PropertyinfoComponent.prototype.changeTab = function (test, test1) {
        //const liNavID = "ID" + test.toString().split(/#(.+)?/)[1];
        //document.getElementById(test1).classList.remove('active');
        //document.getElementById(liNavID).classList.add('active');
        //console.log(liNavID);
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertyinfoComponent.prototype, "propertyForm", void 0);
    __decorate([
        core_1.Input('errorForm'), 
        __metadata('design:type', Object)
    ], PropertyinfoComponent.prototype, "errorForm", void 0);
    __decorate([
        core_1.ViewChild('villadescription'), 
        __metadata('design:type', Object)
    ], PropertyinfoComponent.prototype, "villadescription", void 0);
    PropertyinfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertyinfo-cmp ',
            templateUrl: 'propertyinfo.component.html',
            styleUrls: ['propertyinfo.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, homeservice_1.MainService, platform_browser_1.DomSanitizer])
    ], PropertyinfoComponent);
    return PropertyinfoComponent;
}());
exports.PropertyinfoComponent = PropertyinfoComponent;
//# sourceMappingURL=propertyinfo.component.js.map