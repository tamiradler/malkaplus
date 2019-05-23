import { Component, OnInit } from '@angular/core';
import { NavbarToggleService } from './navbar.toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarToggleData: any;

  constructor(private navbarToggleService: NavbarToggleService) { }

  ngOnInit() {
    this.navbarToggleData = this.navbarToggleService.data;
  }

}
