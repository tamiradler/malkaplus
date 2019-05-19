import { Component, OnInit, Input } from '@angular/core';
import { DishItem } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-add-dish-item',
  templateUrl: './add-dish-item.component.html',
  styleUrls: ['./add-dish-item.component.css']
})
export class AddDishItemComponent implements OnInit {

  @Input() dishItem: DishItem;
  @Input() dishItems: Array<DishItem>;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }


  remove() {
    this.dishItems.splice(this.index, 1);
  }
}
