import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LoginService} from "../../providers/login/login.service";
import {FormGroup} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: ' villa-cmp ',
    templateUrl: 'villa.component.html',
    styleUrls: ['villa.component.css']
})

export class VillaComponent implements OnInit{
    @Output() openEnquiry = new EventEmitter<boolean>();
    @Input() villa;

    constructor ( private loginService: LoginService) { }

    ngOnInit() { }

    public roundRate(rate) {
        return this.numberWithCommas(rate && parseFloat(rate).toFixed(2) || 0);
    }

    public open(villa: boolean) {
        this.openEnquiry.emit(villa);
    }

    private copy() {
        document.execCommand('copy');
    }

    private numberWithCommas(x) {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }  
}
