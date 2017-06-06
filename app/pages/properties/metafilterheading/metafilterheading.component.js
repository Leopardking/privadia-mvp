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
var properties_service_1 = require('../../../providers/properties/properties.service');
var forms_1 = require("@angular/forms");
var MetafilterheadingComponent = (function () {
    function MetafilterheadingComponent(propertiesService) {
        this.propertiesService = propertiesService;
        this.housekeeperState = 0;
        this.housekeepOtherInfo = "";
        this.liftAvailable = false;
        this.uniqueBenefits = "";
        this.PoITypes = [];
    }
    MetafilterheadingComponent.prototype.ngOnInit = function () {
        var _this = this;
        switch (this.name) {
            case "Points of Interest":
                this.propertiesService.getPoITypes().subscribe(function (d) {
                    _this.PoITypes = d;
                    _this.PoITypes.map(function (item, index) {
                        item.typeName = "";
                        item.distance = 0;
                        item.checked = false;
                    });
                }, function (e) {
                    console.log("Get Points of Types error: ", e);
                });
                break;
            case "Services":
                this.housekeepOtherInfo = "";
                this.housekeeperState = 0;
                break;
        }
    };
    /*
    private housekeeperStateChange(s) {
        this.housekeeperState = s;
    }

    private housekeeperOtherInfoChange(e) {
        this.housekeepOtherInfo = e.target.innerHTML;
    }
    */
    ///////////////		Points of Interests	  //////////////////
    MetafilterheadingComponent.prototype.checkboxClick = function (e) {
        var index = e.target.getAttribute('type-id');
        this.PoITypes[index].checked = !this.PoITypes[index].checked;
        var ele = $("input.name")[index];
        if (ele.value == "" && this.PoITypes[index].checked) {
            $(ele).parent().addClass("has-error");
        }
        else {
            $(ele).parent().removeClass("has-error");
        }
        ele = $("input.distance")[index];
        if (ele.value == "" && this.PoITypes[index].checked) {
            $(ele).parent().addClass("has-error");
        }
        else {
            $(ele).parent().removeClass("has-error");
        }
    };
    MetafilterheadingComponent.prototype.nameChanged = function (e) {
        var index = e.target.getAttribute('type-id');
        this.PoITypes[index].typeName = e.target.value;
    };
    MetafilterheadingComponent.prototype.distanceChanged = function (e) {
        var index = e.target.getAttribute('type-id');
        this.PoITypes[index].distance = e.target.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MetafilterheadingComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], MetafilterheadingComponent.prototype, "propertyForm", void 0);
    MetafilterheadingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' metafilter-heading-cmp ',
            templateUrl: 'metafilterheading.component.html',
            styleUrls: ['metafilterheading.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService])
    ], MetafilterheadingComponent);
    return MetafilterheadingComponent;
}());
exports.MetafilterheadingComponent = MetafilterheadingComponent;
//# sourceMappingURL=metafilterheading.component.js.map