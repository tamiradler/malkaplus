declare const gapi: any;

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { UserRestControllerService } from 'src/swaggergenerate/services';

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
  public userSkills$: BehaviorSubject<string[]>;

  constructor(private userRestControllerService: UserRestControllerService) {
    this.user$ = new BehaviorSubject(null);
    this.userSkills$ = new BehaviorSubject(null);
  }

  public getUpdatedUser(): User {
    if (this.auth2.isSignedIn.get()) {
      var googleUser = this.auth2.currentUser.get()
      return this.handleGoogleUser(googleUser);
    }
  }

  public setUser(user: User){
    this.user$.next(user);
  }

  public unsetUser() {
    this.user$.next(null);
    this.userSkills$.next(null);
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

  private handleGoogleUser(googleUser: any): User {
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
    this.loadUserFromServer(user.tokenId);
    this.setUser(user);
    return user;
  }

  loadUserFromServer(tokenId: string) {
    this.userRestControllerService.getUserUsingGET1(tokenId).subscribe(
      user => {
        this.userSkills$.next(user.skills);
      }
    )
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
