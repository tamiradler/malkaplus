declare const gapi: any;
declare const window: any;
var self: SignInComponent;

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {

  constructor(private userService: UserService) {
    self = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    window.onSignIn = this.onSignIn;
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let user: User = {
      email: profile.getEmail(),
      familyName: profile.getFamilyName(),
      givenName: profile.getGivenName(),
      id: profile.getId(),
      imageUrl: profile.getImageUrl(),
      name: profile.getName(),
      tokenId: googleUser.getAuthResponse().id_token
    };
    self.userService.setUser(user);
  }

  signOut() {

    console.log('blat');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.userService.unsetUser();
      console.log('User signed out.');
    });
  }
}
