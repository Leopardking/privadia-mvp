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
var CalendarListComponent = (function () {
    function CalendarListComponent() {
        this.deleteAvailability = new core_1.EventEmitter();
        this.editAvailability = new core_1.EventEmitter();
        this.datatableInited = false;
    }
    CalendarListComponent.prototype.ngOnInit = function () {
        this.availabilityForm.valueChanges.subscribe(function (data) {
        });
    };
    CalendarListComponent.prototype.finishReading = function () {
        var DataTable = $('#datatables');
        DataTable.DataTable({
            paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    };
    CalendarListComponent.prototype.formattedDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
    CalendarListComponent.prototype.editEvent = function (evt) {
        this.editAvailability.next(evt);
    };
    CalendarListComponent.prototype.deleteEvent = function (evt) {
        this.deleteAvailability.next(evt);
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], CalendarListComponent.prototype, "availabilityForm", void 0);
    __decorate([
        core_1.Input('errorForm'), 
        __metadata('design:type', Object)
    ], CalendarListComponent.prototype, "errorForm", void 0);
    __decorate([
        core_1.Input('bookingDays'), 
        __metadata('design:type', Object)
    ], CalendarListComponent.prototype, "bookingDays", void 0);
    __decorate([
        core_1.Output('deleteAvailability'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarListComponent.prototype, "deleteAvailability", void 0);
    __decorate([
        core_1.Output('editAvailability'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarListComponent.prototype, "editAvailability", void 0);
    CalendarListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' calendar-list-cmp ',
            templateUrl: 'calendar-list.component.html',
            styleUrls: ['calendar-list.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarListComponent);
    return CalendarListComponent;
}());
exports.CalendarListComponent = CalendarListComponent;
//# sourceMappingURL=calendar-list.component.js.map