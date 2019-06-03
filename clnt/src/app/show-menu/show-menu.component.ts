import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavbarToggleService } from '../navbar/navbar.toggle.service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { Menu } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-show-menu',
  templateUrl: './show-menu.component.html',
  styleUrls: ['./show-menu.component.css']
})
export class ShowMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  
  hideEditorController: boolean = false;

  hide() {
    this.hideEditorController = true;
  }

  ngOnDestroy(): void {
    this.navbarToggleService.data.isToShowNavBar = true;
  }
  
  ngAfterViewInit(): void {
    let div = document.getElementById('contentWithImage');
    div.style.backgroundImage = "url(" + localStorage.getItem('imageResult') + ")";
    this.contentColor = localStorage.getItem('contentColor');
    this.headlineColor = localStorage.getItem('headlineColor');
  }

  menu: Menu;
  headlineColor: String;
  contentColor: String;

  constructor(private navbarToggleService: NavbarToggleService,
              private loadSpinnerService: LoadSpinnerService,
              private menuRestControllerService: MenuRestControllerService) { }

  ngOnInit() {
    this.navbarToggleService.data.isToShowNavBar = false;
    this.loadMenu(new Date());
  }

  previewFile(event) {
    let div = document.getElementById('contentWithImage');
    let file    = event.target.files[0];
    let reader: FileReader  = new FileReader();
    reader.addEventListener("load", function () {
      div.style.backgroundImage = "url(" + reader.result as string + ")";
      localStorage.setItem('imageResult', reader.result as string);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  headlineColorChange(event) {
    localStorage.setItem('headlineColor', event.target.value);
    this.headlineColor = event.target.value;
  }

  contentColorChange(event) {
    localStorage.setItem('contentColor', event.target.value);
    this.contentColor = event.target.value;
  }

  loadMenu(date: Date) {
    let dateKey: string = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    
    this.loadSpinnerService.addRequestor('loadMenu');
    this.menuRestControllerService.getMenusUsingGET(dateKey).subscribe(
      menu => {
        this.loadSpinnerService.removeRequestor('loadMenu');
        this.menu = menu;
        this.menu.dishs.splice(2, 0, {});
      },
      error => {
        this.loadSpinnerService.removeRequestor('loadMenu');
      }
    )
  }
}
