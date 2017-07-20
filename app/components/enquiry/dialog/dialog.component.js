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
        this.errorForm = false;
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    DialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });
        setTimeout(function () {
            _this.scrollToBottom();
        }, 500);
        this.messageForm = new forms_1.FormGroup({
            MessageThreadId: new forms_1.FormControl(this.enquiryId),
            Content: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    };
    DialogComponent.prototype.ngOnChanges = function () {
        console.log('Changes');
    };
    DialogComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.status === 'INVALID')
            return this.errorForm = true;
        form.value.IsMine = true;
        this.data.push(form.value);
        this.errorForm = false;
        this.messagesService.addMessage(form.value).subscribe(function (d) {
            $.notify({
                icon: "notifications",
                message: "Message Submitted Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            console.log('Send Message', d);
        }, function (e) {
            $.notify({
                icon: "notifications",
                message: "Message Submitted Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            console.log('Send Message Error', e);
            _this.scrollToBottom();
        });
        this.scrollToBottom();
        this.messageForm.controls['Content'].reset();
    };
    DialogComponent.prototype.formatDate = function (date, format) {
        return moment.utc(date).local().format(format);
    };
    DialogComponent.prototype.formatTime = function (time, format) {
        return moment.utc(time).local().format(format);
    };
    DialogComponent.prototype.scrollToBottom = function () {
        $('.messages-wrp').scrollTop($('.messages-wrp').prop('scrollHeight'));
        $('.messages-wrp').perfectScrollbar('update');
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