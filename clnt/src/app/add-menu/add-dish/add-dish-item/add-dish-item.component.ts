import { Component, OnInit, Input } from '@angular/core';
import { DishItem } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-add-dish-item',
  templateUrl: './add-dish-item.component.html',
  styleUrls: ['./add-dish-item.component.css']
})
export class AddDishItemComponent implements OnInit {

  @Input() dishItem: DishItem;

  constructor() { }

  ngOnInit() {
  }

}
