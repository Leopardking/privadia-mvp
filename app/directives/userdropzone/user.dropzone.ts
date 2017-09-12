import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';


@Directive({ selector: 'userdropzone' })
export class UserDropzone {
    @Output() fileEvent = new EventEmitter();
    constructor(el: ElementRef) {
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
}