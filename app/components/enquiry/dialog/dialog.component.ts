import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {MessagesService} from "../../../providers/messages/messages.service";

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

	constructor( private messagesService: MessagesService ) {
	    this.user = JSON.parse(localStorage.getItem('user'));
    }

	ngOnInit() {
        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });

        this.messageForm = new FormGroup({
            MessageThreadId: new FormControl(this.enquiryId),
            Content: new FormControl('Test message send', Validators.required)
        });
    }

    ngOnChanges() {
	    console.log('Changes')
    }

    public onSubmit(value) {
        value.IsMine = true;
        this.data.push(value);

        this.messagesService.addMessage(value).subscribe(
            d => {
                console.log('Send Message', d)
            },
            e => {
                console.log('Send Message Error', e)
            }
        )
    }

    public formatTime(time, format) {
	    return moment(time).utcOffset(moment().utcOffset()).format(format);
    }
}