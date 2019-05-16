import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  public date$: BehaviorSubject<Date> = new BehaviorSubject(null);

  setDate(date: Date) {
    this.date$.next(date);
  }

  constructor() { }

}
