import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {

  @Input() dish: Dish;
  @Input() dishs: Array<Dish>;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

  addDishItem() {
    if (this.dish.dishItems === undefined) {
      this.dish.dishItems = [];
    }
    this.dish.dishItems.push({});
  }

  remove() {
    this.dishs.splice(this.index, 1);
  }
}
