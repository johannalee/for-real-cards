import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import {AccountTools, Credentials, ConnectTools, ConnectEvent, ConnectEventType} from "../../common-app/api";
import {CommonPopups} from "../../common-app/ui-twbs-ng2";

@Component({
  template: `
        <div class='xs-col-12'>
          <div ng-show="message" ng-click="setServer()" class="alert alert-danger" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {{message}} 
            <br/>
            Tap to change server.
          </div>
          <button type="button" ng-click="registerOpenClose()" class="btn btn-default btn-block">
            Sign Up
          </button>
           
            <form role="form" ng-show='registering'>
              <div class="panel-heading">
                <h3 class="panel-title">Register</h3>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="username">Username:</label>
                    <input ng-model="credentials.username" type="text" class="form-control" id="username">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="email">Email</label><span> (optional)</span>
                    <input ng-model="credentials.email" type="text" class="form-control" id="email">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password">Password</label><span> (optional)</span>
                    <input ng-model="credentials.password" type="password" class="form-control" id="password">
                  </div>
                  <div class="form-group col-md-6">                    
                    <button ng-click="register()" class="btn btn-primary pull-right">OK, Let's Play</button> 
                  </div>
                </div>
              </div>
            </form>

          <button type="button" ng-click="loginOpenClose()" class="btn btn-default btn-block">
            Login
          </button>
          
            <form role="form" ng-show='loggingIn'>
              <div class="panel-heading">
                <h3 class="panel-title">Login</h3>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="username">Username:</label>
                    <input ng-model="credentials.username" type="text" class="form-control" id="username">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="email">Email</label><span> (optional)</span>
                    <input ng-model="credentials.email" type="text" class="form-control" id="email">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password">Password</label><span> (optional)</span>
                    <input ng-model="credentials.password" type="password" class="form-control" id="password">
                  </div>
                  <div class="form-group col-md-6">                    
                    <button ng-click="login()" class="btn btn-primary pull-right">OK, Let's Play</button> 
                  </div>

                </div>
              </div>
            </form>

          
          <button type="button" ng-click="tempUser()" class="btn btn-default btn-block">
            Nah, Just Play
          </button>
        </div>
      `
})
export class Start {
  message:string;
  loggingIn:boolean;
  registering:boolean;
  credentials:Credentials;

  constructor() {
    ConnectTools.checkConnection();
    ConnectTools.subscribe(
      (event:ConnectEvent)=>{
        this.message = event.message;
      }
    );
//    $scope.$on('$destroy', function () {
//      ConnectTools.stopCheckingConnection();
//    });
  }

  registerOpenClose() {
    this.registering = !this.registering;
    this.loggingIn = false;
  }

  loginOpenClose() {
    this.loggingIn = !this.loggingIn;
    this.registering = false;
  }

  login() {
    let observable:Observable = AccountTools.login(this.$scope, this.credentials);
    observable.subscribe(
      (user)=>{
        FastCardsTopFrame.navigateToWelcome();
      }, (error)=> {
        CommonPopups.alert(error);
      }
    );
  }

  register() {
    AccountTools.register(this.$scope, this.credentials).subscribe(
      ()=>{
        FastCardsTopFrame.navigateToWelcome();
      }, (error)=>{
        CommonPopups.alert(error);
      }
    );
  }

  tempUser() {
    AccountTools.createTempUser(this.$scope).subscribe(
      ()=>{
        FastCardsTopFrame.navigateToWelcome();
      }, (error)=>{
        CommonPopups.alert(error);
      }
    );
  }

  setServer() {
    ConnectTools.setServer();
  }
}