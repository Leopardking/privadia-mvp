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
var messages_service_1 = require("../../../providers/messages/messages.service");
var DialogComponent = (function () {
    function DialogComponent(messagesService) {
        this.messagesService = messagesService;
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    DialogComponent.prototype.ngOnInit = function () {
        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });
        this.messageForm = new forms_1.FormGroup({
            MessageThreadId: new forms_1.FormControl(this.enquiryId),
            Content: new forms_1.FormControl('Test message send', forms_1.Validators.required)
        });
    };
    DialogComponent.prototype.onSubmit = function (value) {
        this.messagesService.addMessage(value).subscribe(function (d) {
            console.log('Send Message', d);
        }, function (e) {
            console.log('Send Message Error', e);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DialogComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DialogComponent.prototype, "enquiryId", void 0);
    DialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dialog-cmp ',
            templateUrl: 'dialog.component.html',
            styleUrls: ['dialog.component.css']
        }), 
        __metadata('design:paramtypes', [messages_service_1.MessagesService])
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.component.js.map