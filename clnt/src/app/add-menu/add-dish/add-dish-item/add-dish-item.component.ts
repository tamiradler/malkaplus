import { Component, OnInit, Input, NgZone } from '@angular/core';
import { DishItem } from 'src/swaggergenerate/models';
import { DishItemSubjectsService } from './dish-item-subjects.service';

@Component({
  selector: 'app-add-dish-item',
  templateUrl: './add-dish-item.component.html',
  styleUrls: ['./add-dish-item.component.css']
})
export class AddDishItemComponent implements OnInit {

  @Input() dishItem: DishItem;
  @Input() dishItems: Array<DishItem>;
  @Input() index: number;
  subjects: string[];
  constructor(private dishItemSubjectsService: DishItemSubjectsService) {
    dishItemSubjectsService.subjects$.subscribe(subjects => {
      this.subjects = subjects;
    })
   }

  ngOnInit() {
  }

  remove() {
    this.dishItems.splice(this.index, 1);
  }
}
