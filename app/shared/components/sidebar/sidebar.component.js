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
var sidebar_routes_config_1 = require('./sidebar-routes.config');
var sidebar_metadata_1 = require('./sidebar.metadata');
var SidebarComponent = (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
        $.getScript('../../../assets/js/init/initMenu.js');
        $.getScript('../../../assets/js/sidebar-moving-tab.js');
        //$.getScript('../../assets/js/plugins/bootstrap-datetimepicker.js');
        this.menuItems = sidebar_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType !== sidebar_metadata_1.MenuType.BRAND; });
    };
    SidebarComponent.prototype.onLoggedout = function () {
        $('body').removeClass('nav-open');
        localStorage.removeItem('id_token');
    };
    SidebarComponent.prototype.menuClick = function () {
        //$('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        //$("dashboard-cmp .main-content").scrollTop(0);
        //return true;
    };
    SidebarComponent.prototype.getFullName = function () {
        var user = JSON.parse(localStorage.getItem('user'));
        return user.FirstName + " " + user.LastName;
    };
    SidebarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-sidebar',
            templateUrl: 'sidebar.component.html',
            styleUrls: ['sidebar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map