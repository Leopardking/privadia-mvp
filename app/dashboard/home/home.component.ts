import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../app/services/homeservice';
import { LoginService } from '../../../app/services/login/login.service';
import { PropertiesService } from '../../../app/services/properties/properties.service';
import { VillaComponent } from '../components/villa/villa.component';

@Component({
    moduleId: module.id,
    selector: ' home-cmp ',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{

	private villas;
    private regions: any;

    constructor ( 
        private mainService: MainService,  
        private loginService: LoginService, 
        private propertiesService: PropertiesService) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        this.loginService.login("steve@freelancemvc.net", "password")
        		.subscribe( 
                    d => { 
            			this.mainService.setToken(d.token_type + ' ' + d.access_token); 
            			this.mainService.getVillas().subscribe( 
                            d => { 
                                this.villas = d; 
                            }, 
                            e => { console.log("error:", e); } 
                        );

                        this.propertiesService.getregions().subscribe( 
                            d => {
                                this.regions = d;
                            },
                            e => { console.log(e); }
                        );
        		    }, 
                    e => { console.log("error:", e)} 
                );
    }
}
