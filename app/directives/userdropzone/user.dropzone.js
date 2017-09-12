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
var UserDropzone = (function () {
    function UserDropzone(el) {
        this.fileEvent = new core_1.EventEmitter();
        var this_ = this;
        var element = $(el.nativeElement);
        element.bind('dragover', processDragOverOrEnter);
        element.bind('dragenter', processDragOverOrEnter);
        element.bind('dragend', endDragOver);
        element.bind('dragleave', endDragOver);
        element.bind('drop', dropHandler);
        function dropHandler(angularEvent) {
            if (element.hasClass('dragging')) {
                element.removeClass('dragging');
            }
            var event = angularEvent.originalEvent || angularEvent;
            event.preventDefault();
            this_.fileEvent.next(event.dataTransfer.files);
        }
        function processDragOverOrEnter(angularEvent) {
            var event = angularEvent.originalEvent || angularEvent;
            if (event) {
                event.preventDefault();
            }
            event.dataTransfer.effectAllowed = 'copy';
            element.addClass('dragging');
            return false;
        }
        function endDragOver() {
            element.removeClass('dragging');
        }
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserDropzone.prototype, "fileEvent", void 0);
    UserDropzone = __decorate([
        core_1.Directive({ selector: 'userdropzone' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], UserDropzone);
    return UserDropzone;
}());
exports.UserDropzone = UserDropzone;
//# sourceMappingURL=user.dropzone.js.map