import { Component, OnInit } from '@angular/core';
import { CommentRestControllerService } from 'src/swaggergenerate/services';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private commentRestControllerService: CommentRestControllerService) {
    
   }

  ngOnInit() {
    this.commentRestControllerService.getCommentsUsingGET().subscribe(
      comments => {

      },
      error => {
        console.error(error);
      }
    )
  }

}
