import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariablesProvider {

  public userEmail: string;
  public password: string;
  public userId: number;
  public userRoleId: number;
  public userRoleTitle: String;

  public accessToken: String;
  public expires_in: number;

  // ===========================
  public token_type: String;
  public refresh_token: String;
  public scope: String;
  // ==========================


  constructor() {
    this.userEmail = null;
    this.password = null;
    this.userId = null;
    this.userRoleId = null;

    this.accessToken = null;
    this.expires_in = null;
    this.token_type = null;
    this.refresh_token = null;
    this.scope = null;
    this.userRoleTitle = null;
  }

  setUserEmail(value) {
    this.userEmail = value;
  }

  getUserEmail() {
    return this.userEmail;
  }

  setPassword(value) {
    this.password = value;
  }

  getPassword() {
    return this.password;
  }

  setUserId(value) {
    this.userId = value;
  }

  getUserId() {
    return this.userId;
  }

  setExpiresIn(value) {
    this.expires_in = value;
  }

  getExpiresIn() {
    return this.expires_in;
  }

  setTokenType(value) {
    this.token_type = value;
  }

  getTokenType() {
    return this.token_type;
  }

  setRefreshToken(value) {
    this.refresh_token = value;
  }

  getRefreshToken() {
    return this.refresh_token;
  }

  setScope(value) {
    this.scope = value;
  }

  getScope() {
    return this.scope;
  }


  setAccessToken(value) {
    console.log(value);
    this.accessToken = value;
  }

  getAccessToken() {
    console.log(this.accessToken);
    return this.accessToken;
  }

  setUserRoleId(value) {

    console.log("userRoleId : ");
    console.log(value);
    this.userRoleId = value;
  }

  getUserRoleId() {
    return this.userRoleId;
  }

  setUserRoleTitle(value) {

    console.log("userRoleTitle : ");
    console.log(value);
    this.userRoleTitle = value;
  }

  getUserRoleTitle() {
    return this.userRoleTitle;
  }


}