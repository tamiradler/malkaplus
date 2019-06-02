import { Injectable, NgZone } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarToggleService {
  
  data = {
    isToShowNavBar: true,
    isToShowAddDishes: false,
    isToShowBuildMenu: false,
    isToShowShowMenu: false,
    isToShowEditUser: false
  }

  constructor(private userService: UserService, private ngZone: NgZone) {
    userService.userSkills$.subscribe(
      userSkills => {
        ngZone.run(()=>{
          if (userSkills == null) {
            this.hideRequiredSkillsMenus();
            return;
          }
  
          this.handleAdminSkill(userSkills);
          this.handleMenuEditorSkill(userSkills);
        })
      }
    )
  }


  handleMenuEditorSkill(userSkills: string[]) {
    if (userSkills.includes('menuEditor')) {
      this.data.isToShowAddDishes = true;
      this.data.isToShowBuildMenu = true;
      this.data.isToShowShowMenu = true;
    }
  }


  handleAdminSkill(userSkills: string[]) {
    if (userSkills.includes('admin')) {
      this.data.isToShowAddDishes = true;
      this.data.isToShowBuildMenu = true;
      this.data.isToShowShowMenu = true;
      this.data.isToShowEditUser = true;
    }
  }


  hideRequiredSkillsMenus() {
    this.data.isToShowAddDishes = false;
    this.data.isToShowBuildMenu = false;
    this.data.isToShowShowMenu = false;
    this.data.isToShowEditUser = false;
  }

}
