import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

@IonicPage()
@Component({
  selector: 'page-patient-reports',
  templateUrl: 'patient-reports.html',
})
export class PatientReportsPage {

  items: any;
  patientList: any;
  patientNameList: any;
  companyListButtonClicked: boolean;
  ManageCompanyButtonClicked: boolean;
  patientName: String;

  first_name: String;
  last_name: String;
  age: Number;
  gender: String;
  mobile: Number;
  isSmoke: boolean;
  isAlcoholic: boolean;
  blood_group: String;
  patientId: number;

  testResponce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public restProvider: RestProvider, public loadingCtrl: LoadingController, public globalVar: GlobalVariablesProvider) {

    this.companyListButtonClicked = true;
    this.ManageCompanyButtonClicked = false;

    this.patientId = null;
    this.first_name = '';
    this.last_name = '';
    this.age = null;
    this.gender = '';
    this.mobile = null;
    this.isSmoke = false;
    this.isAlcoholic = false;
    this.blood_group = '';

    this.getPatientList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientReportsPage');
  }

  itemClick(item) {
    this.companyListButtonClicked = false;
    this.ManageCompanyButtonClicked = true;

    this.patientName = item.item;
    console.log("12345===>" + this.patientName);

    for (let entry of this.patientList) {
      var name = entry.patientFirstName + " " + entry.patientLastName;
      console.log(name);
      if (name == this.patientName) {
        this.patientId = entry.patientId;
        this.first_name = entry.patientFirstName;
        this.last_name = entry.patientLastName;
        this.age = entry.age;
        this.gender = entry.patientGender;
        this.mobile = entry.patientMobileNumber;
        this.getTestByPatientId(this.patientId);
        console.log("patientId=> " + this.patientId);
      }
    }
  }

  getTestByPatientId(patientId) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider
      .getTestByPatientId(this.patientId)
      .subscribe(
        data => {
          loading.dismiss();
          this.testResponce = data.data;
          console.log("testResponce==>" + this.testResponce);
          if (data.status == 200) {
            this.isSmoke = this.testResponce.isSmoker;
            this.isAlcoholic = this.testResponce.isAlcoholic;
            this.blood_group = this.testResponce.bloodGroup;
          }
        },
        err => {
          console.log("ERROR!: ", err);
        }
      );
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
}
