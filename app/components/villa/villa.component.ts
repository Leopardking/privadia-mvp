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
    //@Input('open') public openEnquiry;
    @Output() openEnquiry = new EventEmitter<boolean>();
    @Input('openVilla') public openVilla;
    @Input('filter') public filterForm: FormGroup;
    @Input() villa;
    @Input() region;
    voted = false;

    constructor ( private loginService: LoginService) { }

    ngOnInit() { }

    public roundRate(rate) {
        return this.numberWithCommas(rate && parseFloat(rate).toFixed(2) || 0);
    }

    /*
    private openEnquiry(villa) {
        this.openVilla = villa
        console.log('Open enquiry villa', villa)
    }
    */

    public vote(villa: boolean) {
        this.openEnquiry.emit(villa);
    }

    private copy() {

        /// TS_IGNORE
        //document.getElementById('villainfo-'+this.villa.Id).select();

        document.execCommand('copy');
    }

    private numberWithCommas(x) {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }  
}
