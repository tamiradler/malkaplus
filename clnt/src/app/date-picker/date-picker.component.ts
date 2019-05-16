import { Component, OnInit } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  date: Date = new Date();

  constructor(private datePickerService: DatePickerService) {
    this.dateChanged(new Date());
  }

  ngOnInit() {
  }

  dateChanged(date: Date) {
    this.datePickerService.setDate(date);
  }
}
