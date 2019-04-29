import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public globalVar: GlobalVariablesProvider) {

    let loading = this.loadingCtrl.create({
      content: 'Logout processing...'
    });
    loading.present();

    globalVar.setAccessToken(null);
    globalVar.setExpiresIn(null);
    globalVar.setUserEmail(null);
    globalVar.setPassword(null);
    globalVar.setUserId(null);

    loading.dismiss();
    this.navCtrl.setRoot(LoginPage);
  }
}