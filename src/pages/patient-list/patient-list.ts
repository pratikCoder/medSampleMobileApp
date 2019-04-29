import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

/**
 * Generated class for the PatientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-list',
  templateUrl: 'patient-list.html',
})
export class PatientListPage {

  items: any;

  patientList: any;

  patientNameList: any;

  companyListButtonClicked: boolean;
  ManageCompanyButtonClicked: boolean;

  patientName: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public restProvider: RestProvider, public loadingCtrl: LoadingController, public globalVar: GlobalVariablesProvider) {
    this.companyListButtonClicked = true;
    this.ManageCompanyButtonClicked = false;
    this.getPatientList();


  }

  // itemClick(item) {
  //   this.companyListButtonClicked = false;
  //   this.ManageCompanyButtonClicked = true;

  //   this.patientName = item.item;
  //   console.log("12345===>" + this.patientName);

  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientListPage');
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
