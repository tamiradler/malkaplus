import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  @Input() dish: Dish;

  constructor(){
  }

  ngOnInit() {
  }

}
