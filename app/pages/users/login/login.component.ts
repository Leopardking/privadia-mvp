import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: ' login-cmp ',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit{
    public loginForm = new FormGroup({
        email: new FormControl('Test'),
        password: new FormControl('Password'),
    });

    constructor (  ) {

    }

    ngOnInit(){

        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    
    private onSubmit() {
        console.log('On Submit',)
    }
}
