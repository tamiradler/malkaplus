import { Component, OnInit } from '@angular/core';
import { Menu, Dish, DishItem} from 'src/swaggergenerate/models';
import { DatePickerService } from '../date-picker/date-picker.service';
import { MenuRestControllerService } from 'src/swaggergenerate/services/menu-rest-controller.service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';
import { UserService } from '../user.service';
import { ErrorMessagesHolderService } from '../error-messages-holder-service';
import { User } from '../user';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  searchDishText: string;
  searchSubjectText: string;
  newMenu: Menu = {};
  date: Date;
  distinctSubjects: string[];
  distinctDishes: string[] = [];
  user: User = null;
  newMenuSubjects: string[] = [];
  newDishes: string[] = [];
  savedMenuElement: {newDishes: string[], newMenuSubjects: string[]}[] = [];

  constructor(private datePickerService: DatePickerService,
              private menuRestControllerService: MenuRestControllerService,
              private loadSpinnerService: LoadSpinnerService,
              private userService: UserService,
              private errorMessagesHolderService: ErrorMessagesHolderService) { }

  ngOnInit() {
    this.datePickerService.date$.subscribe(date => {
      this.date = date;
    })
    // Load menu function here
    // this.loadMockMenu();


    this.loadSpinnerService.addRequestor('loadDistinctValues');
    this.loadDistinctSubjects();
    this.loadDistinctDishes();
    this.loadSpinnerService.removeRequestor('loadDistinctValues');
  }

  loadDistinctSubjects() {
    this.menuRestControllerService.getDistinctDishesUsingGET().subscribe(
      dishes => {
       this.distinctDishes = dishes;
      }
    )
  }

  loadDistinctDishes() {
    this.menuRestControllerService.getDistinctSubjectsUsingGET().subscribe(
      subjects => {
        this.distinctSubjects = subjects;
      }
    )
  }

  onSubjectClick(subject: string) {
    if(!this.newMenuSubjects.includes(subject)) {
      this.newMenuSubjects.push(subject);
    }
    let divToChange = document.getElementById('subjectCol');
    divToChange.parentElement.parentElement.className="list-group-item disabled list-group-item-action list-group-item-success";
  }

  onDishClick(dishItemSubject: string) {
    if(this.newMenuSubjects.length !== 0 && !this.newDishes.includes(dishItemSubject)) {
      this.newDishes.push(dishItemSubject);
    }
  }

  onSaveNewDish() {
    const saved: {newDishes: string[], newMenuSubjects: string[]} = {newDishes: [], newMenuSubjects: []};
    saved.newDishes = this.newDishes;
    saved.newMenuSubjects = this.newMenuSubjects;
    this.savedMenuElement.push(saved);

    this.newDishes = [];
    this.newMenuSubjects = [];

    const subjectCol = document.getElementById('subjectCol');
    subjectCol.parentElement.parentElement.className = '';
  }

  onRemoveNewDish(subject: string[]) {
    this.savedMenuElement.forEach(
      (item, index) => {
        if(item.newMenuSubjects.slice().pop() === subject.slice().pop()) {
          this.savedMenuElement.splice(index, 1);
        }
      }
    );
  }

  onCancelNewDish() {
    this.newDishes = [] as string[];
    this.newMenuSubjects = [] as string[];
    let subjectCol = document.getElementById('subjectCol');
    subjectCol.parentElement.parentElement.className = '';
  }

  onSaveNewMenu() {
    this.populateNewMenu();
    this.postNewMenu();
  }

  postNewMenu() {
    this.user = this.userService.getUpdatedUser();
    if (this.user == null) {
      this.errorMessagesHolderService.addMessage('בשביל לשמור תפריט צריך להתחבר');
      return;
    }
    const addMenuUsingPOSTParams: MenuRestControllerService.AddMenuUsingPOSTParams = {menu: this.newMenu, authTokenId: this.user.tokenId};
    this.loadSpinnerService.addRequestor('addNewMenu');
    this.menuRestControllerService.addMenuUsingPOST(addMenuUsingPOSTParams).subscribe(
      (menu: Menu) => {
        this.newMenu = {};
        this.loadSpinnerService.removeRequestor('addNewMenu');
      },
      error => {
        this.loadSpinnerService.removeRequestor('addNewMenu');
        this.errorMessagesHolderService.addMessage('שגיאה בשמירת התפריט');
        console.log(error);
      }
    );
  }

  private populateNewMenu() {
    this.newMenu.dateId = this.date.getDate() + '_' + (this.date.getMonth()+1) + '_' + this.date.getFullYear();
    this.newMenu.dishs = [];
    for (const menuElement of this.savedMenuElement) {
      let dishArr: Dish[] = [];
      let dish: Dish = {};
      for (const menuSubject of menuElement.newMenuSubjects) {
        dish.subject = menuSubject;
      }
      let dishItemArr: DishItem[] = [];
      for (const menuDishes of menuElement.newDishes) {
        let dishItem: DishItem = {};
        dishItem.subject = menuDishes;
        dishItemArr.push(dishItem);
      }
      dish.dishItems = dishItemArr;
      dishArr.push(dish);
      for (let dish of dishArr) {
        this.newMenu.dishs.push(dish);
      }
    }
  }

  loadMockMenu() {
    this.distinctDishes = ["אורז","אטריות","דג","קציצות","חומוס","עוף שלם"];
    this.distinctSubjects = ["מנת שף","עיקרית","מרק","סלטים"];
  }

}
