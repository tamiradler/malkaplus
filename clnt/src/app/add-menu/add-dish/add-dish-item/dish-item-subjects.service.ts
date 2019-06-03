import { Injectable } from '@angular/core';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishItemSubjectsService {

  subjects$: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor(private menuRestControllerService: MenuRestControllerService) {
    menuRestControllerService.getDistinctDishesUsingGET().subscribe(subjects=>{
      this.subjects$.next(subjects);
    })
  }

}
