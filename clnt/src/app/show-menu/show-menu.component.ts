import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-show-menu',
  templateUrl: './show-menu.component.html',
  styleUrls: ['./show-menu.component.css']
})
export class ShowMenuComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    let div = document.getElementById('contentWithImage');
    div.style.backgroundImage = "url(" + localStorage.getItem('imageResult') + ")";
  }

  headlineColor: String;
  contentColor: String;

  constructor() { }

  ngOnInit() {
  }

  previewFile(event) {
    let div = document.getElementById('contentWithImage');
    let file    = event.target.files[0];
    let reader: FileReader  = new FileReader();
    reader.addEventListener("load", function () {
      div.style.backgroundImage = "url(" + reader.result as string + ")";
      localStorage.setItem('imageResult', reader.result as string);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  headlineColorChange(event) {
    console.log(event.target.value);
    this.headlineColor = event.target.value;
  }

  contentColorChange(event) {
    console.log(event.target.value);
    this.contentColor = event.target.value;
  }

}
