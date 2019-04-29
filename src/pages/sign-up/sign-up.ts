import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  repass: string = '';
  email: string = '';
  mbl: number;
  role: String;
  role_desc: String;
  userId: number;
  user: any;

  response: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public restProvider: RestProvider) {

  }


  goRegister() {

    if (this.first_name.length == 0 ||
      this.last_name.length == 0 ||
      this.password.length == 0 ||
      this.repass.length == 0 ||
      this.email.length == 0 ||
      this.role.length == 0 ||
      this.role_desc.length == 0) {
      alert("Please fill the fields...");
    }
    else {
      // if (this.mbl.toString.length != 10) {
      //   alert("Please enter 10 digit mobile number..!");
      // }
      if (this.password != this.repass) {
        alert("Passwords are mis-match, Please Check ..!");
      }
      else {
        console.log("first name: " + this.first_name);
        console.log("last name: " + this.last_name);
        console.log("password: " + this.password);
        console.log("repete password: " + this.repass);
        console.log("email id: " + this.email);
        console.log("mobile no.: " + this.mbl);
        console.log("role: " + this.role);
        console.log("role_desc: " + this.role_desc);

        this.user = {
          "firstName": this.first_name,
          "lastName": this.last_name,
          "password": this.password,
          "rePassword": this.repass,
          "emailId": this.email,
          "mobileNo": this.mbl,
          "isActive": "true",
          "role": {
            "roleTitle": this.role,
            "roleDesc": this.role_desc
          }
        };

        this.restProvider
          .addUserData(this.user)
          .subscribe(
            data => {
              console.log(data);
              this.response = data;
              console.log("3");

              if (this.response.status == 200) {
                let loading = this.loadingCtrl.create({
                  content: 'User Info Added...',
                  duration: 2000
                });
                loading.onDidDismiss(() => {
                  console.log('Dismissed loading');
                });
                loading.present();
                this.navCtrl.setRoot(LoginPage);
              } else {
                let loading = this.loadingCtrl.create({
                  content: 'User Info Not Added...',
                  duration: 2000
                });
                loading.onDidDismiss(() => {
                  console.log('Dismissed loading');
                });
                loading.present();
                this.navCtrl.setRoot(SignUpPage);
              }
            },
            err => {
              console.log("ERROR!: ", err);
            }
          );
      }
    }
  }
  clear() {
    this.first_name = null;
    this.last_name = null;
    this.password = null;
    this.repass = null;
    this.email = null;
    this.mbl = null;
    this.role_desc = null;
    this.role = null;
  }

  cancel() {
    this.first_name = null;
    this.last_name = null;
    this.password = null;
    this.repass = null;
    this.email = null;
    this.mbl = null;
    this.role_desc = null;
    this.role = null;
    this.navCtrl.setRoot(LoginPage);
  }


}