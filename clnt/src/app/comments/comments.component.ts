import { Component, OnInit } from '@angular/core';
import { CommentRestControllerService } from 'src/swaggergenerate/services';
import { Comment } from 'src/swaggergenerate/models';
import { UserService } from '../user.service';
import { User } from '../user';
import { ErrorMessagesHolderService } from '../error-messages-holder-service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';

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

  constructor(private commentRestControllerService: CommentRestControllerService, 
    private userService: UserService, 
    private errorMessagesHolderService: ErrorMessagesHolderService,
    private loadSpinnerService: LoadSpinnerService) {
    userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.loadSpinnerService.addRequestor('loadComments');
    this.commentRestControllerService.getCommentsUsingGET().subscribe(
      comments => {
        this.loadSpinnerService.removeRequestor('loadComments');
        this.comments = comments.reverse();
      },
      error => {
        this.loadSpinnerService.removeRequestor('loadComments');
        console.error(error);
      }
    )
  }

  addComment() {
    this.user = this.userService.getUpdatedUser();

    if (this.user == null) {
      this.errorMessagesHolderService.addMessage('בשביל להוסיף תגובה צריך להתחבר');
      return;
    }

    let addCommentUsingPOSTParams: CommentRestControllerService.AddCommentUsingPOSTParams = {
      authTokenId: this.user.tokenId,
      comment: this.comment
    }
    this.loadSpinnerService.addRequestor('addComment');
    this.commentRestControllerService.addCommentUsingPOST(addCommentUsingPOSTParams).subscribe(
      comment => {
        this.loadComments()
        this.loadSpinnerService.removeRequestor('addComment');
      },
      error => {
        this.loadSpinnerService.removeRequestor('addComment');
        console.log(error);
      }
    )
    this.comment = {
    };
  }
}
