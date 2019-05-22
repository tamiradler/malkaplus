import { Component, OnInit } from '@angular/core';
import { Menu} from 'src/swaggergenerate/models';
import { DatePickerService } from '../date-picker/date-picker.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  searchText: string;
  menu: Menu = {};
  testMenu: Menu = {};
  date: Date;

  constructor(private datePickerService: DatePickerService) { }

  ngOnInit() {
    this.datePickerService.date$.subscribe(date => {
      this.date = date;
      this.loadMockMenu();
    })
  }

  loadMockMenu(){
    this.testMenu =
      {
        dateId: '12/05/2019',
        dishs: [
          {
            dishItems: [
              {
                content: '',
                subject: 'עוף שלם'
              },
              {
                content: '',
                subject: 'פטריות'
              },
              {
                content: '',
                subject: 'פול'
              }
            ],
            subject: 'מנת השף'
          },
          {
            subject: 'עיקריות',
            dishItems: [
              {
                subject: 'שניצל',
                content: ''
              },
              {
                subject: 'דג',
                content: ''
              },
              {
                subject: 'בורקס',
                content: ''
              },
              {
                subject: 'כבד',
                content: ''
              },
              {
                subject: 'פרה',
                content: ''
              }
            ]
          },
          {
            subject: 'תוספות',
            dishItems: [
              {
                subject: 'אורז',
                content: ''
              },
              {
                subject: 'פירה',
                content: ''
              },
              {
                subject: 'אפונה',
                content: ''
              },
              {
                subject: 'במיה',
                content: ''
              }
            ]
          }
        ],
      };



  }

}
