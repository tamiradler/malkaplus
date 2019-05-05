import { Component, OnInit } from '@angular/core';
import { CommentRestControllerService } from 'src/swaggergenerate/services';
import { Comment } from 'src/swaggergenerate/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comment: Comment = {
  };

  comments: Comment[]

  constructor(private commentRestControllerService: CommentRestControllerService) {
    
   }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentRestControllerService.getCommentsUsingGET().subscribe(
      comments => {
        this.comments = comments.reverse();
      },
      error => {
        console.error(error);
      }
    )
  }

  addComment(){
    this.commentRestControllerService.addCommentUsingPOST(this.comment).subscribe(
      comment => {
        this.loadComments()
      },
      error => {

      }
    )
    this.comment = {
    };
  }
}
