import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: ' villa-cmp ',
    templateUrl: 'villa.component.html',
    styleUrls: ['villa.component.css']
})

export class VillaComponent implements OnInit{

    @Input() villa;
    @Input() region;

    public villaInfo: string;
    private villaRegion: string;

    constructor (  ) {

    }

    ngOnInit() {
        this.villaInfo = this.getInfo();
    }

    public roundRate(rate) {
        return this.numberWithCommas(rate && parseFloat(rate).toFixed(2) || 0);
    }

    private getRichInfo() {
        return "<b>" + this.villa.Name + "</b>" +
            "<br>" + this.villa.Bedrooms.toString() +
            ((this.villa.Bedrooms === 1) ? " Bedroom" : " Bedrooms") +
            " | " + this.villa.CollaboratorInitials +
            "<br>Area: " + this.region +
            "<br>Full Info: <a href='" + this.villa.BoxUrl + "'>" +
            this.villa.BoxUrl + "</a>" +
            "<br><b><u>Price: €" + this.villa.TotalRate + "</u></b><br><br><br>";
    }

    private getInfo() {
        return this.villa.Name +
            "\n" + this.villa.Bedrooms.toString() +
            ((this.villa.Bedrooms === 1) ? " Bedroom" : " Bedrooms") +
            " | " + this.villa.CollaboratorInitials +
            "\nArea: " + this.region +
            "\nFull Info: " + this.villa.BoxUrl +
            "\nPrice: €" + this.villa.TotalRate + '\n\n';
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
