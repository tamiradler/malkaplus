import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-menu',
  templateUrl: './show-menu.component.html',
  styleUrls: ['./show-menu.component.css']
})
export class ShowMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

  previewFile(event) {
    let preview = document.querySelector('img');
    let file    = event.target.files[0];
    let reader: FileReader  = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result as string;
      console.log(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

}
