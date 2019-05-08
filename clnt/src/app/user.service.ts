declare const gapi: any;

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth2: any;

  private scope = [
    'profile',
    'email'
  ].join(' ');

  private clientId:string = '795668388432-7lor70m45089bapr51bng6t14003g4hc.apps.googleusercontent.com';

  public user$: BehaviorSubject<User>;

  constructor() {
    this.user$ = new BehaviorSubject(null);
  }

  public setUser(user: User){
    this.user$.next(user);
  }

  public unsetUser() {
    this.user$.next(null);
  }

  public googleInit(element: HTMLElement) {
    let that = this;
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      }).then(()=>{
        this.auth2 = gapi.auth2.getAuthInstance();
        if (element != undefined) {
          that.attachSignin(element);
        }
        if (this.auth2.isSignedIn.get()) {
          var googleUser = this.auth2.currentUser.get()
          this.handleGoogleUser(googleUser);
        }
      });
    });
  }

  private handleGoogleUser(googleUser: any) {
    let profile = googleUser.getBasicProfile();
    let user: User = {
      email: profile.getEmail(),
      familyName: profile.getFamilyName(),
      givenName: profile.getGivenName(),
      id: profile.getId(),
      imageUrl: profile.getImageUrl(),
      name: profile.getName(),
      tokenId: googleUser.getAuthResponse().id_token
    };
    this.setUser(user);
  }

  private attachSignin(element: HTMLElement) {
    this.auth2.attachClickHandler(element, {},
      googleUser => {
        this.handleGoogleUser(googleUser);
      }, error => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  public signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.unsetUser();
      console.log('User signed out.');
    });
  }
}
