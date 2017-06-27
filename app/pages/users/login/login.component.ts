import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { LoginService } from '../../../providers/login/login.service';
import {MainService} from "../../../providers/homeservice";

import { PropertiesService } from '../../../providers/properties/properties.service';
import { BookingService } from '../../../providers/booking/booking.service';
import {Router} from "@angular/router";

declare const $:any;

@Component({
    moduleId: module.id,
    selector: ' login-cmp ',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit{
    public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
    // public apiUrl:string = 'http://privadia-mvp-api-2-dev/api';
    private token:string = "";
    private errorForm = false;

    public loginForm = new FormGroup({
        Email: new FormControl('admin@freelancemvc.net', Validators.compose([
            Validators.required,
            //Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm)
        ])),
        Password: new FormControl('password', Validators.required),
    });

    constructor ( private loginService: LoginService,
                  private router: Router,
                  private MainProvider: MainService,
                  private PropertiesProvider: PropertiesService,
                  private BookingProvider: BookingService ) {

    }

    ngOnInit(){
        console.log('Init Form', this.loginForm);
        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    
    private onSubmit() {
        /*
        this.loginService.login(this.apiUrl, "steve@freelancemvc.net", "password")
            .subscribe(
                d => {
                    this.setToken(d.token_type + ' ' + d.access_token);
                },
                e => { console.log("error:", e)}
            );
        */
        this.loginService.login(this.apiUrl, this.loginForm.value.Email, this.loginForm.value.Password).subscribe(
            d => {
                console.log('Login  ',d.access_token);
                localStorage.setItem('id_token', d.access_token);
                console.log('Local Storage',localStorage.getItem('id_token'))
                this.router.navigate(['home']);
                /*
                this.setToken(d.token_type + ' ' + d.access_token);
                this.PropertiesProvider.setToken(this.token);
                this.BookingProvider.setToken(this.token);

                this.PropertiesProvider.setApiURL(this.MainProvider.apiUrl);
                this.BookingProvider.setApiURL(this.MainProvider.apiUrl);
                */
                console.log('On Submit Success', d)
            },
            e => {
                console.log('On Submit error', e)
            }
        );
        console.log('On Submit', this.loginForm)
        this.errorForm = true;
    }

    public setToken(token) {
        this.token = token;
    }

}
