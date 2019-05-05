import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

}
