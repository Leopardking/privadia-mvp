import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: ' villa-cmp ',
    templateUrl: 'villa.component.html'
})

export class VillaComponent implements OnInit{

    @Input() villa;

    constructor ( ) {

    }

    ngOnInit() {
        
    }

    public roundRate(rate) {
        return parseFloat(rate).toFixed(2);
    }
}
