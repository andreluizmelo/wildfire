import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
@NgModule({
  providers: []
})
export class PerfilPage {

    constructor(public navCtrl: NavController) {
        
    }
}