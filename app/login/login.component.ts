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
    // public apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net/api';
    private errorForm = false;

    public loginForm = new FormGroup({
        Email: new FormControl('steve@freelancemvc.net', Validators.compose([
            Validators.required,
            Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ])),
        Password: new FormControl('password', Validators.required),
    });

    constructor ( private loginService: LoginService,
                  private router: Router, ) {

    }

    checkFullPageBackgroundImage(){
        const $page = $('.full-page');
        const image_src = $page.data('image');

        if(image_src !== undefined){
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();

        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    private onSubmit() {
        this.loginService.login(this.apiUrl, this.loginForm.value.Email, this.loginForm.value.Password).subscribe(
            d => {
                localStorage.setItem('id_token', d.token_type + ' ' + d.access_token);
                this.router.navigate(['dashboard']);
            },
            e => {
                console.log('On Submit error', e)
            }
        );

        this.errorForm = true;
    }
}
