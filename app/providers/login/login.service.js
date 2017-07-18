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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/observable/throw');
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.isReading = true;
        console.log('Load Login Service');
    }
    LoginService.prototype.getDataUser = function (header) {
        var _this = this;
        this.getCurrentUser(header).subscribe(function (d) {
            _this.userInfo = d;
            _this.isReading = false;
            localStorage.setItem('user', JSON.stringify(d));
        }, function (e) {
            console.log('Error get user ', e);
        });
    };
    LoginService.prototype.login = function (apiUrl, email, password) {
        var grant_type = "password";
        if (email && password && grant_type) {
            var username = encodeURIComponent(email);
            var pwd = encodeURIComponent(password);
            var gtype = encodeURIComponent(grant_type);
            return this.http.post(apiUrl + '/token', "grant_type=" + grant_type + "&username=" + username + "&password=" + pwd)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    LoginService.prototype.getPermission = function (permission) {
        var permissions = JSON.parse(localStorage.getItem('user')).Permissions;
        // console.log('Permission ', permissions);
        return permissions.find(function (element) { return element.Name === permission; });
    };
    LoginService.prototype.getRoles = function (role) {
        var roles = JSON.parse(localStorage.getItem('user')).Roles;
        return roles.find(function (element) { return element.Name === role; });
    };
    LoginService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem('user'));
    };
    LoginService.prototype.getCurrentUser = function (headerToken) {
        var header = new http_1.Headers({ 'Authorization': headerToken || this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Users/GetCurrent', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    LoginService.prototype.handleError = function (error) {
        var errMsg;
        console.log('Error Login', error);
        if (error instanceof http_1.Response) {
            errMsg = error.json() || '';
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map