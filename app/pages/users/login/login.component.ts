import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: ' login-cmp ',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit{
    public loginForm = new FormGroup({
        Email: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm)
        ])),
        Password: new FormControl('Password', Validators.required),
    });

    constructor (  ) {

    }

    ngOnInit(){

        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    
    private onSubmit() {
        console.log('On Submit', this.loginForm)
    }
}
