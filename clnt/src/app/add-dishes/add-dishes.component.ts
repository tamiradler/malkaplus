import { ErrorMessagesHolderService } from './../error-messages-holder-service';
import { Menu, Dish } from 'src/swaggergenerate/models';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { DatePickerService } from '../date-picker/date-picker.service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css']
})
export class AddDishesComponent implements OnInit {


  searchText: string;
  menu: Menu = {};
  date: Date;

  constructor(private menuRestControllerService: MenuRestControllerService,
    private datePickerService: DatePickerService,
    private loadSpinnerService: LoadSpinnerService,
    private userService: UserService,
    private errorMessagesHolderService: ErrorMessagesHolderService) { }

  ngOnInit() {
    this.datePickerService.date$.subscribe(date => {
      this.date = date;
      this.loadMenu(date);
    })
  }

  onDishRemoved(dishRemoved: {index: number})
  {
    if(this.menu.dishs !== undefined)
    {
      this.menu.dishs.splice(dishRemoved.index, 1);
    }
  }

  loadMenu(date: Date) {
    let dateKey: string = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();

    this.loadSpinnerService.addRequestor('loadMenu');
    this.menuRestControllerService.getMenusUsingGET(dateKey).subscribe(
      menu => {
        this.loadSpinnerService.removeRequestor('loadMenu');
        this.menu = menu;
        if (this.menu.dishs == null) {
          this.menu.dishs = [
            {
              dishItems: [],
              subject: 'מנה עיקרית'
            },
            {
              dishItems: [],
              subject: 'מנת השף'
            },
            {
              dishItems: [],
              subject: 'תוספות'
            },
            {
              dishItems: [],
              subject: 'צמחוני'
            },
            {
              dishItems: [],
              subject: 'מרקים'
            }
          ];
        }
      },
      error => {
        this.loadSpinnerService.removeRequestor('loadMenu');
      }
    )
  }

  addDish() {
    if (this.menu.dishs === undefined){
      this.menu.dishs = [];
    }
    this.menu.dishs.push({
      dishItems: []
    });
  }

  submit() {
    let dateKey: string = this.date.getDate() + '_' + (this.date.getMonth()+1) + '_' + this.date.getFullYear();
    this.menu.dateId = dateKey;
    let user: User = this.userService.getUpdatedUser();
    if (user == null) {
      this.errorMessagesHolderService.clearMessages();
      this.errorMessagesHolderService.addMessage('בשביל לשמור תפריט צריך להתחבר');
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
