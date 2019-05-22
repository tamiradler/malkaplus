import { DishItem } from './../../swaggergenerate/models/dish-item';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    // searchText = searchText.toLowerCase();

    return items.filter( it => {
      return this.isExistInDishItemSubject(it, searchText);
    });


   }

   isExistInDishItemSubject(it: {dishItems: DishItem[], subject: string}, searchText: string){
    for (let item of it.dishItems){
      if(item.subject.includes(searchText))
      {
        return true;
      }
    }
    return false;
  }
}
