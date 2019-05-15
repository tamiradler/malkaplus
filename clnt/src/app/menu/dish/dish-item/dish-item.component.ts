import { Component, OnInit, Input } from '@angular/core';
import { DishItem } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {

  @Input() dishitem: DishItem;

  constructor() { }

  ngOnInit() {
  }

}
