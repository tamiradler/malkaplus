import { Component, OnInit } from '@angular/core';
import { CommentRestControllerService } from 'src/swaggergenerate/services';
import { Comment } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  private comments: Comment[]

  constructor(private commentRestControllerService: CommentRestControllerService) {
    
   }

  ngOnInit() {
    this.commentRestControllerService.getCommentsUsingGET().subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.error(error);
      }
    )
  }

}
