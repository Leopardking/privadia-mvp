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
var login_service_1 = require("../login/login.service");
var proposals_service_1 = require("../proposals/proposals.service");
var EnquiryService = (function () {
    function EnquiryService(http, loginService, proposalsService) {
        this.http = http;
        this.loginService = loginService;
        this.proposalsService = proposalsService;
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        console.log('Load Enquiry Service');
    }
    EnquiryService.prototype.readDataEnquiries = function () {
        var _this = this;
        this.getEnquiries().subscribe(function (d) {
            _this.enquiries = d;
        }, function (e) {
            console.log('Error Enquiries', e);
        });
    };
    EnquiryService.prototype.readDataEnquiry = function (id) {
        var _this = this;
        this.getEnquiryById(id).subscribe(function (d) {
            _this.enquiry = d;
        }, function (e) {
            console.log('Error Enquiries', e);
        });
    };
    EnquiryService.prototype.createProposal = function (id) {
        var _this = this;
        this.proposalsService.createProposals(id).subscribe(function (d) {
            _this.enquiry = d;
        }, function (e) {
            console.log('Error Create Proposal', e);
        });
    };
    EnquiryService.prototype.getEnquiries = function () {
        if (!this.loginService.getPermission('Lookups/GetRegions'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + "/api/Enquiries", options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EnquiryService.prototype.addEnquiry = function (data) {
        if (!this.loginService.getPermission('Lookups/GetRegions'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + "/api/Enquiries", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EnquiryService.prototype.getEnquiryById = function (id) {
        if (!this.loginService.getPermission('Lookups/GetRegions'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + "/api/Enquiries/" + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EnquiryService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    EnquiryService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    EnquiryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService, proposals_service_1.ProposalsService])
    ], EnquiryService);
    return EnquiryService;
}());
exports.EnquiryService = EnquiryService;
//# sourceMappingURL=enquiry.service.js.map