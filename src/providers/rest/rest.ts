import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '../../../node_modules/@angular/http';
import 'rxjs/add/operator/map';
import { Http } from '../../../node_modules/@angular/http';
import { GlobalVariablesProvider } from '../global-variables/global-variables';


@Injectable()
export class RestProvider {

  constructor(public http: Http, public globalVar: GlobalVariablesProvider) {
    console.log('Hello RestProvider Provider');
  }

  baseApiUrl = 'http://localhost:9009';
  auth_token: string;

  // getting authentication with tokens
  public doLogin(userEmail, password) {
    let url = this.baseApiUrl + "/oauth/token";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic bXktY2xpZW50OnNlY3JldA==');
    let options = new RequestOptions({ headers: headers });
    let body = "grant_type=" + 'password' + "&username=" + userEmail + "&password=" + password;
    // alert(body);
    return this.http.post(url, body, options)
      .map(res => res.json());
  }

  // getting user data
  public getUserData() {
    console.log("getUserData()");
    this.auth_token = "bearer " + this.globalVar.getAccessToken();
    let url = this.baseApiUrl + "/user/getByEmailId?userEmailId=" + this.globalVar.getUserEmail();
    //username;
    console.log(this.globalVar.getUserEmail());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(res => res.json());
  }

  // adding patient
  public addPatient(patient) {
    console.log("addPatient()");
    this.auth_token = "bearer " + this.globalVar.getAccessToken();
    let url = this.baseApiUrl + "/patient/add";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    let body = patient;
    // alert(body);
    return this.http.post(url, body, options)
      .map(res => res.json());
  }

  // get all patients
  public getAllPatients() {
    console.log("getAllPatients()");
    this.auth_token = "bearer " + this.globalVar.getAccessToken();
    let url = this.baseApiUrl + "/patient/getAll";
    //username;
    console.log(this.globalVar.getUserEmail());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(res => res.json());
  }

  // adding patient test
  public addPatientTest(patientTest) {
    console.log("addPatientTest() : patientTest" + patientTest);
    this.auth_token = "bearer " + this.globalVar.getAccessToken();
    let url = this.baseApiUrl + "/medicalTest/add";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    let body = patientTest;
    // alert(body);
    return this.http.post(url, body, options)
      .map(res => res.json());
  }

  // Adding user data
  public addUserData(userBody) {
    console.log("2");
    this.auth_token = "Basic bXktY2xpZW50OnNlY3JldA==";
    let url = this.baseApiUrl + "/user/add";
    //username;
    console.log(this.globalVar.getUserEmail());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, userBody, options)
      .map(res => res.json());
  }

  // get test from patient ID
  public getTestByPatientId(patientId) {
    console.log("getTestByPatientId() : patientId :" + patientId);
    this.auth_token = "bearer " + this.globalVar.getAccessToken();
    let url = this.baseApiUrl + "/medicalTest/getByPatientId?patientId=" + patientId;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(res => res.json());
  }

  // get user role from role ID
  public getUserRole(roleId) {
    console.log("getUserRole() : roleId :" + roleId);
    this.auth_token = "bearer " + this.globalVar.getAccessToken();
    let url = this.baseApiUrl + "/role/getByUserRoleId?userRoleId=" + roleId;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(res => res.json());
  }
}
