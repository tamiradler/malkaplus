declare const gapi: any;

import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {

  isSignIn: boolean = false;

  private clientId:string = '795668388432-7lor70m45089bapr51bng6t14003g4hc.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email'
  ].join(' ');

  public auth2: any;

  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(document.getElementById("googleBtn"));
    });
  }

  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      googleUser => {
        this.ngZone.run(()=>{
          that.isSignIn = true;
          this.userService.unsetUser();
        });
        
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }, error => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private userService: UserService, private ngZone: NgZone) {
    
  }

  ngOnInit() {
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.isSignIn = false;
        this.userService.unsetUser();
      });
      console.log('User signed out.');
    });
  }

  ngAfterViewInit(){
    this.googleInit();
  }
}
