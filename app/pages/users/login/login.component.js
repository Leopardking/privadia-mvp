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
var login_service_1 = require('../../../providers/login/login.service');
var homeservice_1 = require("../../../providers/homeservice");
var properties_service_1 = require('../../../providers/properties/properties.service');
var booking_service_1 = require('../../../providers/booking/booking.service');
var LoginComponent = (function () {
    function LoginComponent(loginService, MainProvider, PropertiesProvider, BookingProvider) {
        this.loginService = loginService;
        this.MainProvider = MainProvider;
        this.PropertiesProvider = PropertiesProvider;
        this.BookingProvider = BookingProvider;
        this.apiUrl = 'http://privadia-mvp-api-dev.azurewebsites.net';
        this.token = "";
        this.errorForm = false;
        this.loginForm = new forms_1.FormGroup({
            Email: new forms_1.FormControl('steve@freelancemvc.net', forms_1.Validators.compose([
                forms_1.Validators.required,
            ])),
            Password: new forms_1.FormControl('password', forms_1.Validators.required),
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log('Init Form', this.loginForm);
        setTimeout(function () {
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        /*
        this.loginService.login(this.apiUrl, "steve@freelancemvc.net", "password")
            .subscribe(
                d => {
                    this.setToken(d.token_type + ' ' + d.access_token);
                },
                e => { console.log("error:", e)}
            );
        */
        this.loginService.login(this.apiUrl, this.loginForm.value.Email, this.loginForm.value.Password).subscribe(function (d) {
            _this.setToken(d.token_type + ' ' + d.access_token);
            _this.PropertiesProvider.setToken(_this.token);
            _this.BookingProvider.setToken(_this.token);
            _this.PropertiesProvider.setApiURL(_this.MainProvider.apiUrl);
            _this.BookingProvider.setApiURL(_this.MainProvider.apiUrl);
            console.log('On Submit Success', d);
        }, function (e) {
            console.log('On Submit error', e);
        });
        console.log('On Submit', this.loginForm);
        this.errorForm = true;
    };
    LoginComponent.prototype.setToken = function (token) {
        this.token = token;
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' login-cmp ',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, homeservice_1.MainService, properties_service_1.PropertiesService, booking_service_1.BookingService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map