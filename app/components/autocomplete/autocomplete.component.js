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
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/catch');
var AutoComplete = (function () {
    function AutoComplete() {
        this.filteredData = [];
    }
    AutoComplete.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredData = this.data.map(function (item, id) {
            return { id: item[_this.idKey], value: item[_this.valueKey] };
        });
    };
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "data", void 0);
    __decorate([
        core_1.Input('idKey'), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "idKey", void 0);
    __decorate([
        core_1.Input('valueKey'), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "valueKey", void 0);
    AutoComplete = __decorate([
        core_1.Component({
            selector: 'autocomplete',
            template: "\n        <input type=\"text\" />\n        <datalist>\n            <option *ngFor=\"let item of filteredData\" value=\"item.id\">{{item.value}}</option>\n        </datalist>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AutoComplete);
    return AutoComplete;
}());
exports.AutoComplete = AutoComplete;
//# sourceMappingURL=autocomplete.component.js.map