import { Component, OnInit } from '@angular/core';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { Menu } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Menu

  constructor(private menuRestControllerService: MenuRestControllerService) { }

  ngOnInit() {
    this.menuRestControllerService.getMenusUsingGET().subscribe(
      menus => {
        menus.forEach(menu => {
          if (menu.dateId == '15_5_2019') {
            this.menu = menu;
          }
        })
      }
    )
  }

}
