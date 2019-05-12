import { Component, OnInit } from '@angular/core';
import { LoadSpinnerService } from './load-spinner-service';
declare var $: any;
@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css']
})
export class LoadSpinnerComponent implements OnInit {

  constructor(private loadSpinnerService: LoadSpinnerService) { 
    loadSpinnerService.loadSpinnerComponent = this;
  }

  ngOnInit() {
  }

  show() {
    $("#spinner-modal").modal('show');
  }

  hide() {
    $("#spinner-modal").modal('hide');
  }
}
