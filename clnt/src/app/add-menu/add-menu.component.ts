import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  menu: Menu = {};

  constructor() { }

  ngOnInit() {
    this.menu.dishs = [];
  }

  addDish() {
    this.menu.dishs.push({
      subject: "aa",
      dishItems: [{content: "aa", subject: "bb"}, {content: "bb", subject: "aa"}]
    });
  }
}
