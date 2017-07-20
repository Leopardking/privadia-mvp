"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require('@angular/router');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var helpers_1 = require("../../helpers/helpers");
var ExtendedHttpService = (function (_super) {
    __extends(ExtendedHttpService, _super);
    function ExtendedHttpService(backend, defaultOptions, router) {
        _super.call(this, backend, defaultOptions);
        this.router = router;
    }
    ExtendedHttpService.prototype.request = function (url, options) {
        //do whatever
        // if (typeof url === 'string') {
        //     if (!options) {
        //         options = { headers: new Headers() };
        //     }
        //     this.setHeaders(options);
        // } else {
        //     this.setHeaders(url);
        // }
        return _super.prototype.request.call(this, url, options).catch(this.catchErrors());
    };
    ExtendedHttpService.prototype.catchErrors = function () {
        var _this = this;
        return function (res) {
            if (res.status === 401 /*|| res.status === 403*/) {
                //handle authorization errors
                //in this example I am navigating to logout route which brings the login screen
                localStorage.clear();
                _this.router.navigate(['/login']);
            }
            if (res.status === 403) {
                helpers_1.handlerErrorNotify('You do not have the required permission for this request.');
            }
            return Observable_1.Observable.throw(res);
        };
    };
    ExtendedHttpService.prototype.setHeaders = function (objectToSetHeadersTo) {
        //add whatever header that you need to every request
        //in this example I add header token by using authService that I've created
        //objectToSetHeadersTo.headers.set('Token', this.authService.getToken());
    };
    ExtendedHttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.XHRBackend, http_1.RequestOptions, router_1.Router])
    ], ExtendedHttpService);
    return ExtendedHttpService;
}(http_1.Http));
exports.ExtendedHttpService = ExtendedHttpService;
//# sourceMappingURL=extended-http.service.js.map