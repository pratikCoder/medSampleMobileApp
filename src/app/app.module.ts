import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '../../node_modules/@angular/http';
import { RestProvider } from '../providers/rest/rest';
import { GlobalVariablesProvider } from '../providers/global-variables/global-variables';
import { LogoutPage } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';
import { AddPatientPage } from '../pages/add-patient/add-patient';
import { AddPatientTestPage } from '../pages/add-patient-test/add-patient-test';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { PatientReportsPage } from '../pages/patient-reports/patient-reports';
import { PatientListPage } from '../pages/patient-list/patient-list';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LogoutPage,
    HomePage,
    AddPatientPage,
    AddPatientTestPage,
    SignUpPage,
    PatientReportsPage,
    PatientListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LogoutPage,
    HomePage,
    AddPatientPage,
    AddPatientTestPage,
    SignUpPage,
    PatientReportsPage,
    PatientListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    GlobalVariablesProvider
  ]
})
export class AppModule { }
