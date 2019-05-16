import { Component, OnInit, NgZone } from '@angular/core';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { Menu } from 'src/swaggergenerate/models';
import { DatePickerService } from '../date-picker/date-picker.service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Menu

  constructor(private menuRestControllerService: MenuRestControllerService, 
              private datePickerService: DatePickerService,
              private loadSpinnerService: LoadSpinnerService) { }

  ngOnInit() {

    this.datePickerService.date$.subscribe(
      date => {
        this.loadMenu(date);
      }
    )
  }

  loadMenu(date: Date) {
    let dateKey: string = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    
    this.loadSpinnerService.addRequestor('loadMenu');
    this.menuRestControllerService.getMenusUsingGET(dateKey).subscribe(
      menu => {
        this.loadSpinnerService.removeRequestor('loadMenu');
        this.menu = menu;
      },
      error => {
        this.loadSpinnerService.removeRequestor('loadMenu');
      }
    )
  }
}
