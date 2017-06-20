import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../providers/login/login.service";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
    private errorForm = false;

    public loginForm = new FormGroup({
        Email: new FormControl('steve@freelancemvc.net', Validators.compose([
            Validators.required,
            Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm)
        ])),
        Password: new FormControl('password', Validators.required),
    });

    constructor ( private loginService: LoginService,
                  private router: Router, ) {

    }

    ngOnInit() {
        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    private onSubmit() {
        this.loginService.login(this.apiUrl, this.loginForm.value.Email, this.loginForm.value.Password).subscribe(
            d => {
                localStorage.setItem('id_token', d.access_token);
                this.router.navigate(['home']);
                console.log('On Submit Success', d)
            },
            e => {
                console.log('On Submit error', e)
            }
        );
        console.log('On Submit', this.loginForm)
        this.errorForm = true;
    }
}
