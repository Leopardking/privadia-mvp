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
var LoginComponent = (function () {
    function LoginComponent() {
        this.errorForm = false;
        this.loginForm = new forms_1.FormGroup({
            Email: new forms_1.FormControl(null, forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm)
            ])),
            Password: new forms_1.FormControl(null, forms_1.Validators.required),
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log('Init Form', this.loginForm);
        setTimeout(function () {
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    LoginComponent.prototype.onSubmit = function () {
        console.log('On Submit', this.loginForm);
        this.errorForm = true;
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' login-cmp ',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map