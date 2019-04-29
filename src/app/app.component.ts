import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';
import { AddPatientPage } from '../pages/add-patient/add-patient';
import { AddPatientTestPage } from '../pages/add-patient-test/add-patient-test';
import { PatientReportsPage } from '../pages/patient-reports/patient-reports';
import { PatientListPage } from '../pages/patient-list/patient-list';
import { GlobalVariablesProvider } from '../providers/global-variables/global-variables';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;
  userRole: String;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public globalVar: GlobalVariablesProvider
  ) {
    this.userRole = globalVar.getUserRoleTitle();
    console.log("userRole : ");
    console.log(this.userRole);
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Add Patients', component: AddPatientPage },
      { title: 'Add Patients Test', component: AddPatientTestPage },
      { title: 'Patient Reports', component: PatientReportsPage },
      { title: 'Patient List', component: PatientListPage },
      { title: 'Logout', component: LogoutPage }
    ];
    // set our app's pages
    // this.pages = [];
    // if (this.userRole != "receptionist" || this.userRole != "Receptionist") {
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'Add Patients', component: AddPatientPage },
    //   { title: 'Patient List', component: PatientListPage },
    //   { title: 'Logout', component: LogoutPage }
    // ];
    // } else 
    // if (this.userRole != "sr. doctor" || this.userRole != "sr. doctor"
    //   || this.userRole != "ass. doctor" || this.userRole != "ass. doctor"
    //   || this.userRole != "admin" || this.userRole != "Admin") {
    //   this.pages = [
    //     { title: 'Home', component: HomePage },
    //     { title: 'Add Patients', component: AddPatientPage },
    //     { title: 'Add Patients Test', component: AddPatientTestPage },
    //     { title: 'Patient Reports', component: PatientReportsPage },
    //     { title: 'Patient List', component: PatientListPage },
    //     { title: 'Logout', component: LogoutPage }
    //   ];
    // }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}