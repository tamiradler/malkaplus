import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/swaggergenerate/models';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { DatePickerService } from '../date-picker/date-picker.service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  menu: Menu = {};

  date: Date;

  constructor(private menuRestControllerService: MenuRestControllerService, 
    private datePickerService: DatePickerService,
    private loadSpinnerService: LoadSpinnerService,
    private userService: UserService) { }

  ngOnInit() {
    this.datePickerService.date$.subscribe(date => {
      this.date = date;
      this.loadMenu(date);
    })
  }

  loadMenu(date: Date) {
    let dateKey: string = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    
    this.loadSpinnerService.addRequestor('loadMenu');
    this.menuRestControllerService.getMenusUsingGET(dateKey).subscribe(
      menu => {
        this.loadSpinnerService.removeRequestor('loadMenu');
        this.menu = menu;
        if (this.menu.dishs == null) {
          this.menu.dishs = [];
        }
      },
      error => {
        this.loadSpinnerService.removeRequestor('loadMenu');
      }
    )
  }

  addDish() {
    this.menu.dishs.push({
      dishItems: []
    });
  }

  submit() {
    let dateKey: string = this.date.getDate() + '_' + (this.date.getMonth()+1) + '_' + this.date.getFullYear();
    this.menu.dateId = dateKey;
    let user: User = this.userService.getUpdatedUser();
    if (user == null) {
      return;
    }
    
    let param: MenuRestControllerService.AddMenuUsingPOSTParams = {
      authTokenId: user.tokenId,
      menu: this.menu
    }
    this.loadSpinnerService.addRequestor('submit');
    this.menuRestControllerService.addMenuUsingPOST(param).subscribe(
      menu => {
        this.loadSpinnerService.removeRequestor('submit');
      },
      error => {
        this.loadSpinnerService.removeRequestor('submit');
      }
    )
  }
}
