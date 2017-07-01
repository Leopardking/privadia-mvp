import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../providers/login/login.service";

@Component({
    moduleId: module.id,
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor(public router: Router, public loginService: LoginService) {
        //loginService.getDataUser();
    }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}
