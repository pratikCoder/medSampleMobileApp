import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: String = '';
  password: String = '';
  firstTimeUser: boolean;
  loginResponse: any;
  userResponse: any;
  userRoleResponse: any;
  userRoleId: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public global: GlobalVariablesProvider,
    public loadingCtrl: LoadingController
  ) {

  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.global.setUserEmail(this.username);
    console.log(this.username);
    console.log(this.global.getUserEmail);
    this.global.setPassword(this.password);

    this.restProvider
      .doLogin(this.username, this.password)
      .subscribe(
        data => {
          this.loginResponse = data;
          console.log(this.loginResponse.access_token);
          this.global.setAccessToken(this.loginResponse.access_token);
          console.log(this.global.getAccessToken());
          this.global.setExpiresIn(this.loginResponse.expires_in);
          if (this.loginResponse.access_token != null) {
            loading.dismiss();
            return this.getUserData();
          } else {
            loading.dismiss();
            return this.unAuthenticate();
          }
        },
        err => {
          console.log("ERROR!: ", err);
          loading.dismiss();
        }
      );
  }

  goRegister() {
    this.navCtrl.push(SignUpPage);
  }

  unAuthenticate() {
    this.navCtrl.setRoot(LoginPage);
  }

  authenticate() {
    this.navCtrl.setRoot(HomePage);
  }


  getUserData() {
    console.log("1");
    this.restProvider
      .getUserData()
      .subscribe(
        data => {
          console.log(data);
          this.userResponse = data.data;
          console.log("3");
          this.userRoleId = this.userResponse.role.roleId;
          this.global.setUserId(this.userResponse.userId);
          this.global.setUserRoleId(this.userResponse.role.roleId);
          this.getUserRole(this.userRoleId);
          return this.authenticate();
        },
        err => {
          console.log("ERROR!: ", err);
        }
      );
  }

  getUserRole(userRoleId) {
    console.log("1");
    this.restProvider
      .getUserRole(this.userRoleId)
      .subscribe(
        data => {
          console.log(data);
          this.userRoleResponse = data.data;
          console.log("3");
          console.log(this.userRoleResponse);
          console.log(this.userRoleResponse.roleTitle);
          this.global.setUserRoleTitle(this.userRoleResponse.roleTitle);
        },
        err => {
          console.log("ERROR!: ", err);
        }
      );
  }

  Cancel() {
    this.username = null;
    this.password = null;
  }
}