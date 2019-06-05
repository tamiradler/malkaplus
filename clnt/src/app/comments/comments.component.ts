import { Component, OnInit } from '@angular/core';
import { CommentRestControllerService } from 'src/swaggergenerate/services';
import { Comment } from 'src/swaggergenerate/models';
import { UserService } from '../user.service';
import { User } from '../user';
import { ErrorMessagesHolderService } from '../error-messages-holder-service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';
import { DatePickerService } from '../date-picker/date-picker.service';

declare var $: any; 

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  date: Date;

  comment: Comment = {
  };

  comments: Comment[]

  user: User = null;

  constructor(private commentRestControllerService: CommentRestControllerService, 
    private userService: UserService, 
    private errorMessagesHolderService: ErrorMessagesHolderService,
    private loadSpinnerService: LoadSpinnerService,
    private datePickerService: DatePickerService) {
    userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.datePickerService.date$.subscribe(
      date => {
        this.date = date;
        this.loadComments(date);
      }
    )
  }

  loadComments(date: Date) {
    let dateKey: string = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    this.loadSpinnerService.addRequestor('loadComments');
    this.commentRestControllerService.getCommentsByDateIdUsingGET(dateKey).subscribe(
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
    let dateKey: string = this.date.getDate() + '_' + (this.date.getMonth()+1) + '_' + this.date.getFullYear();
    this.user = this.userService.getUpdatedUser();

    if (this.user == null) {
      this.errorMessagesHolderService.addMessage('בשביל להוסיף תגובה צריך להתחבר');
      return;
    }

    this.comment.dateId = dateKey;
    let addCommentUsingPOSTParams: CommentRestControllerService.AddCommentUsingPOSTParams = {
      authTokenId: this.user.tokenId,
      comment: this.comment
    }
    this.loadSpinnerService.addRequestor('addComment');
    this.commentRestControllerService.addCommentUsingPOST(addCommentUsingPOSTParams).subscribe(
      comment => {
        this.loadComments(this.date);
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

  openModal() {
    this.user = this.userService.getUpdatedUser();

    if (this.user == null) {
      this.errorMessagesHolderService.addMessage('בשביל להוסיף תגובה צריך להתחבר');
      return;
    }
    $('#commentModal').modal('show')
  }
}
