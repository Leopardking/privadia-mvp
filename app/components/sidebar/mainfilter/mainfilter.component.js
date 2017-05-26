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
var initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
var homeservice_1 = require('../../../providers/homeservice');
var MainfilterComponent = (function () {
    function MainfilterComponent(mainService) {
        this.mainService = mainService;
    }
    MainfilterComponent.prototype.ngOnInit = function () {
        $.getScript('../../../assets/js/sidebar-moving-tab.js');
        $.getScript('../../../assets/js/plugins/bootstrap-datetimepicker.js');
        this.filterLocations = [1, 2, 3, 4, 5, 6, 7, 8];
        initDatetimepickers();
        $("#sliderBedroom").noUiSlider({
            start: 1,
            connect: "lower",
            range: {
                min: 1,
                max: 15
            }
        })
            .on('slide', function () {
            $("#bedroomcount").html(parseInt($(this).val()));
        });
    };
    MainfilterComponent.prototype.applyFilter = function () {
        var checkinDate = new Date(this.checkin.nativeElement.value), checkoutDate = new Date(this.checkout.nativeElement.value);
        var filter = new homeservice_1.Filter($("#bedroomcount").val(), this.filterLocations, checkinDate, checkoutDate, this.bottombudget.nativeElement.value, this.topbudget.nativeElement.value, [], 0);
        this.mainService.setFilter(filter, 1);
    };
    MainfilterComponent.prototype.locationLabelClick = function (evt) {
        var t = evt.target;
        t.parentElement.children[0].click();
    };
    MainfilterComponent.prototype.locationChange = function (evt) {
        var t = evt.target;
        var loc = parseInt(t.value);
        if (t.checked) {
            this.filterLocations.push(loc);
        }
        else {
            var index = this.filterLocations.indexOf(loc);
            this.filterLocations.splice(index, 1);
        }
    };
    MainfilterComponent.prototype.getToday = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yy = today.getFullYear();
        return mm + "/" + dd + "/" + yy;
    };
    MainfilterComponent.prototype.getTomorrow = function () {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setTime(today.getTime() + (24 * 60 * 60 * 1000));
        var mm = tomorrow.getMonth() + 1;
        var dd = tomorrow.getDate();
        var yy = tomorrow.getFullYear();
        return mm + "/" + dd + "/" + yy;
    };
    __decorate([
        core_1.ViewChild('bottombudget'), 
        __metadata('design:type', Object)
    ], MainfilterComponent.prototype, "bottombudget", void 0);
    __decorate([
        core_1.ViewChild('topbudget'), 
        __metadata('design:type', Object)
    ], MainfilterComponent.prototype, "topbudget", void 0);
    __decorate([
        core_1.ViewChild('checkin'), 
        __metadata('design:type', Object)
    ], MainfilterComponent.prototype, "checkin", void 0);
    __decorate([
        core_1.ViewChild('checkout'), 
        __metadata('design:type', Object)
    ], MainfilterComponent.prototype, "checkout", void 0);
    MainfilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mainfilter-cmp',
            templateUrl: 'mainfilter.component.html',
            styleUrls: ['./mainfilter.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService])
    ], MainfilterComponent);
    return MainfilterComponent;
}());
exports.MainfilterComponent = MainfilterComponent;
//# sourceMappingURL=mainfilter.component.js.map