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

  user: User;

  constructor(private userService: UserService, private ngZone: NgZone) {
    this.userService.user$.subscribe(user=>
      {
        ngZone.run(()=>{
          this.user = user;
          if (user==null)
          {
            this.isSignIn = false;
          } else {
            this.isSignIn = true;
          }
        });
      })
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.userService.googleInit(document.getElementById("googleBtn"));
  }

  public signOut() {
    this.userService.signOut();
  }
}
