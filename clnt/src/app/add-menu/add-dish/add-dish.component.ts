import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Dish } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {

  @Input() dish: Dish;
  @Input() dishIndex: number;
  @Output() dishRemoved = new EventEmitter < {index: number} > ();

  constructor() { }

  ngOnInit() {
  }

  addDishItem() {
    if (this.dish.dishItems === undefined) {
      this.dish.dishItems = [];
    }
    this.dish.dishItems.push({});
  }

  onRemoveDish(){
    this.dishRemoved.emit({index: this.dishIndex});
  }
}
