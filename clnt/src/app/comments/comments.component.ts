import { Component, OnInit } from '@angular/core';
import { CommentRestControllerService } from 'src/swaggergenerate/services';
import { Comment } from 'src/swaggergenerate/models';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comment: Comment = {
  };

  comments: Comment[]

  user: User = null;

  constructor(private commentRestControllerService: CommentRestControllerService, private userService: UserService) {
    userService.user$.subscribe(user => {
      this.user = user;
    });
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

  addComment() {
    this.user = this.userService.getUpdatedUser();
    let addCommentUsingPOSTParams: CommentRestControllerService.AddCommentUsingPOSTParams = {
      authTokenId: this.user.tokenId,
      comment: this.comment
    }
    this.commentRestControllerService.addCommentUsingPOST(addCommentUsingPOSTParams).subscribe(
      comment => {
        this.loadComments()
      },
      error => {
        console.log(error);
      }
    )
    this.comment = {
    };
  }
}
