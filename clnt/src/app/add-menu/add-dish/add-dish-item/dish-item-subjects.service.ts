import { Injectable } from '@angular/core';
import { MenuRestControllerService } from 'src/swaggergenerate/services';
import { BehaviorSubject } from 'rxjs';
import { DishItemSubjectCollectionRestControllerService } from 'src/swaggergenerate/services/dish-item-subject-collection-rest-controller.service';

@Injectable({
  providedIn: 'root'
})
export class DishItemSubjectsService {

  subjects$: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor(private dishItemSubjectCollectionRestControllerService: DishItemSubjectCollectionRestControllerService) {
    dishItemSubjectCollectionRestControllerService.getDishItemSubjectsUsingGET().subscribe(subjects=>{
      this.subjects$.next(subjects);
    })
  }

}
