import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  items: any;
  text: String;

  patientList: any;

  patientNameList: any;

  companyListButtonClicked: boolean;
  ManageCompanyButtonClicked: boolean;

  is_smoker: Boolean;
  is_alcoholic: Boolean;
  blood_group: String;

  patientId: number;

  patientResponse: any;
  patientName: String;

  addPatientTestObj;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public restProvider: RestProvider, public loadingCtrl: LoadingController, public globalVar: GlobalVariablesProvider) {
    this.companyListButtonClicked = true;
    this.ManageCompanyButtonClicked = false;
    this.getPatientList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  itemClick(item) {
    this.companyListButtonClicked = false;
    this.ManageCompanyButtonClicked = true;

    this.patientName = item.item;
    console.log("12345===>" + this.patientName);

  }

  getPatientList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider
      .getAllPatients()
      .subscribe(
        data => {
          loading.dismiss();
          this.patientList = data.data;
          console.log("patientList==>" + this.patientList);
          if (data.status == 200) {
            this.patientNameList = [];
            for (let entry of this.patientList) {
              var name = entry.patientFirstName + " " + entry.patientLastName;
              var obj = { item: name };
              console.log(entry);
              this.patientNameList.push(obj);
              console.log(this.patientNameList);
            }
            this.items = this.patientNameList;
          }
        },
        err => {
          console.log("ERROR!: ", err);
        }
      );
  }

  addPatientTest() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    for (let entry of this.patientList) {
      var name = entry.patientFirstName + " " + entry.patientLastName;
      if (this.patientName == name) {
        this.patientId = entry.patientId;
      }
    }

    loading.present();

    this.addPatientTestObj = {
      "patientId": this.patientId,
      "isSmoker": this.is_smoker,
      "isAlcoholic": this.is_alcoholic,
      "bloodGroup": this.blood_group,
    }


    console.log("1");
    this.restProvider
      .addPatientTest(this.addPatientTestObj)
      .subscribe(
        data => {
          console.log("llllllllllllllllllllll" + data);
          this.patientResponse = data.data;
          if (this.patientResponse.status == 200) {
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          } else {
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          }
        },
        err => {
          console.log("ERROR!: ", err);
          loading.dismiss();
        }
      );
  }


  resetForm() {
    this.blood_group = null;
    this.is_smoker = null;
    this.is_alcoholic = null;
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }
}
