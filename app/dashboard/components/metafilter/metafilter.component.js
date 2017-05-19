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
var MetafilterComponent = (function () {
    function MetafilterComponent(mainService) {
        this.mainService = mainService;
    }
    MetafilterComponent.prototype.ngOnInit = function () {
        this.collapsed = true;
        this.metafilters = [];
        for (var i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }
    };
    MetafilterComponent.prototype.filterDisplayChange = function () {
        this.collapsed = !this.collapsed;
    };
    MetafilterComponent.prototype.subfilterChange = function (e) {
        var optionId = e.target.tagName == "BUTTON" ? e.target.id : e.target.parentElement.parentElement.id;
        this.metafilters[optionId] = !this.metafilters[optionId];
    };
    MetafilterComponent.prototype.applyMetafilter = function () {
        var metadataFilter = [];
        for (var i = 0; i < 10000; i++) {
            if (this.metafilters[i]) {
                metadataFilter.push(i);
            }
        }
        var filter = new homeservice_1.Filter(0, 0, 0, 0, 0, 0, metadataFilter, this.order);
        this.mainService.setFilter(filter, 2);
        this.collapsed = true;
    };
    MetafilterComponent.prototype.orderChange = function (evt) {
        var t = evt.target;
        this.order = t.value;
        this.sortVillas(t.value);
    };
    MetafilterComponent.prototype.sortVillas = function (orderType) {
        var comparefunc = function (a, b) {
            if (a.TotalRate > b.TotalRate)
                return 1;
            else if (a.TotalRate == b.TotalRate)
                return 0;
            else
                return -1;
        };
        var comparefunc1 = function (a, b) {
            if (a.TotalRate > b.TotalRate)
                return -1;
            else if (a.TotalRate == b.TotalRate)
                return 0;
            else
                return 1;
        };
        if (orderType == 0) {
            this.mainService.villas.sort(comparefunc1);
        }
        else {
            this.mainService.villas.sort(comparefunc);
        }
    };
    MetafilterComponent.prototype.finished = function () {
        //$(".selectpicker").selectpicker();
        return "";
    };
    MetafilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' metafilter-cmp ',
            templateUrl: 'metafilter.component.html',
            styleUrls: ['metafilter.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService])
    ], MetafilterComponent);
    return MetafilterComponent;
}());
exports.MetafilterComponent = MetafilterComponent;
//# sourceMappingURL=metafilter.component.js.map