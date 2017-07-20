import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {MessagesService} from "../../../providers/messages/messages.service";

import * as _ from 'lodash';
declare const $: any;
declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'dialog-cmp ',
    templateUrl: 'dialog.component.html',
    styleUrls: [ 'dialog.component.css' ]
})  

export class DialogComponent implements OnInit, OnChanges{
	@Input() private data: any;
	@Input() private enquiryId: any;

    private messageForm: FormGroup;
    private user;

    public errorForm = false;

	constructor( private messagesService: MessagesService ) {
	    this.user = JSON.parse(localStorage.getItem('user'));
    }

	ngOnInit() {
        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });
        setTimeout(() => {
            this.scrollToBottom();
        },500);

        this.messageForm = new FormGroup({
            MessageThreadId: new FormControl(this.enquiryId),
            Content: new FormControl(null, Validators.required)
        });
    }

    ngOnChanges() {
	    console.log('Changes')
    }

    public onSubmit(form) {
        if(form.status === 'INVALID')
            return this.errorForm = true;

        form.value.IsMine = true;
        this.data.push(form.value);
        this.errorForm = false;

        this.messagesService.addMessage(form.value).subscribe(
            d => {
                $.notify({
                    icon: "notifications",
                    message: "Message Submitted Successfully"

                },{
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                console.log('Send Message', d)
            },
            e => {
                $.notify({
                    icon: "notifications",
                    message: "Message Submitted Successfully"

                },{
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                console.log('Send Message Error', e)
                this.scrollToBottom();
            }
        );
        this.scrollToBottom();
        this.messageForm.controls['Content'].reset();
    }

    public formatDate(date, format) {
	    return moment.utc(date).local().format(format);
    }

    public formatTime(time, format) {
	    return moment.utc(time).local().format(format);
    }

    private scrollToBottom() {
        $('.messages-wrp').scrollTop($('.messages-wrp').prop('scrollHeight') );
        $('.messages-wrp').perfectScrollbar('update');
    }
}