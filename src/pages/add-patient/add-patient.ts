import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-add-patient',
  templateUrl: 'add-patient.html',
})
export class AddPatientPage {

  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  mbl: number;

  patientId: number;
  patient: any;

  response: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPatientPage');
  }

  addPatient() {
    if (this.first_name.length == 0 ||
      this.last_name.length == 0 ||
      this.age == 0 ||
      this.gender.length == 0) {
      alert("Please fill the fields...");
    }
    else {
      console.log("first name: " + this.first_name);
      console.log("last name: " + this.last_name);
      console.log("age: " + this.age);
      console.log("gender: " + this.gender);
      console.log("mobile no.: " + this.mbl);

      this.patient = {
        "patientFirstName": this.first_name,
        "patientLastName": this.last_name,
        "patientAge": this.age,
        "patientGender": this.gender,
        "patientMobileNumber": this.mbl,
      };

      this.restProvider
        .addPatient(this.patient)
        .subscribe(
          data => {
            console.log(data);
            this.response = data;
            console.log("3");

            if (this.response.status == 200) {
              let loading = this.loadingCtrl.create({
                content: 'Patient Info Added...',
                duration: 2000
              });
              loading.onDidDismiss(() => {
                console.log('Dismissed loading');
              });
              loading.present();
              this.navCtrl.setRoot(HomePage);
            } else {
              let loading = this.loadingCtrl.create({
                content: 'Patient Info Not Added...',
                duration: 2000
              });
              loading.onDidDismiss(() => {
                console.log('Dismissed loading');
              });
              loading.present();
              this.navCtrl.setRoot(AddPatientPage);
            }
          },
          err => {
            console.log("ERROR!: ", err);
          }
        );
    }
  }

  clear() {
    this.first_name = null;
    this.last_name = null;
    this.age = null;
    this.gender = null;
    this.mbl = null;
  }

  cancel() {
    this.first_name = null;
    this.last_name = null;
    this.age = null;
    this.gender = null;
    this.mbl = null;
    this.navCtrl.setRoot(HomePage);
  }

}
