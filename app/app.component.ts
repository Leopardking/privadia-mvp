import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

declare var $:any;
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent implements OnInit{
    location: Location;
    constructor(location:Location, public router: Router) {
        this.location = location;
    }
    ngOnInit(){
        console.log('Init app',)
        //$.getScript('../assets/js/init/initMenu.js');
        //$.getScript('../assets/js/demo.js');
    }
    /*
    public isMap(){
        // console.log(this.location);
        if(this.location.prepareExternalUrl(this.location.path()) == '#/maps/fullscreen'){
            return true;
        }
        else {
            return false;
        }
    }
    */
}
