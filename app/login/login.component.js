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
var router_1 = require('@angular/router');
var forms_1 = require("@angular/forms");
var login_service_1 = require("../providers/login/login.service");
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        //public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.errorForm = false;
        this.loginForm = new forms_1.FormGroup({
            Email: new forms_1.FormControl('manager@freelancemvc.net', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ])),
            Password: new forms_1.FormControl('password', forms_1.Validators.required),
        });
    }
    LoginComponent.prototype.checkFullPageBackgroundImage = function () {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
        this.checkFullPageBackgroundImage();
        setTimeout(function () {
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginService.login(this.apiUrl, this.loginForm.value.Email, this.loginForm.value.Password).subscribe(function (d) {
            _this.loginService.getDataUser(d.token_type + ' ' + d.access_token);
            setTimeout(function () {
                localStorage.setItem('id_token', d.token_type + ' ' + d.access_token);
                _this.router.navigate(['dashboard']);
            }, 1500);
        }, function (e) {
            console.log('On Submit error', e);
        });
        this.errorForm = true;
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map