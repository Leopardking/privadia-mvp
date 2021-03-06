import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $:any;

@Component({
    moduleId: module.id,
    selector: 'notification-cmp',
    templateUrl: 'notification.component.html',
    styleUrls: [ 'notification.component.css' ]
})

export class NotificationComponent implements OnInit{
    constructor (
        private router: Router,
    ) {
        console.log('Load Notification Module');
        router.events.subscribe((val) => {
            const hash = window.location.hash;
            hash && $('ul.nav a[href="' + hash + '"]').tab('show');
    }); }

    ngOnInit(){
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    }
}
