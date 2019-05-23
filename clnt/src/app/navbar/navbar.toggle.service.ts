import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarToggleService {

  data = {
    isToShowNavBar: true
  }

  constructor() { }

}
