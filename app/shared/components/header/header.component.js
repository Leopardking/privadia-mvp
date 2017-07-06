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
var navbar_routes_config_1 = require('./navbar-routes.config');
var common_1 = require("@angular/common");
var _ = require('lodash');
var HeaderComponent = (function () {
    function HeaderComponent(location) {
        this.activePage = {
            path: null,
            title: null,
            icon: null
        };
        this.activePageTmp = {
            path: null,
            title: null,
            icon: null
        };
        this.title = null;
        this.location = location;
    }
    HeaderComponent.prototype.ngOnInit = function () { };
    HeaderComponent.prototype.ngDoCheck = function () {
        var title = this.location.prepareExternalUrl(this.location.path());
        this.activePage = _.find(navbar_routes_config_1.ROUTES, function (item) {
            return title.indexOf(item.path) >= 0;
        });
        this.title = this.activePage.title;
        if (localStorage.getItem('title') != null || localStorage.getItem('title') != 'null')
            this.title = this.activePage.title.replace(':id', "\"" + localStorage.getItem('title') + "\"");
    };
    HeaderComponent.prototype.onLoggedout = function () {
        localStorage.removeItem('id_token');
        localStorage.removeItem('permissions');
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-header',
            templateUrl: 'header.component.html',
            styleUrls: ['header.component.css']
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map