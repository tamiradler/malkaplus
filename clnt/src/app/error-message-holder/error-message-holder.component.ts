import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorMessagesHolderService } from '../error-messages-holder-service';

declare var $: any;

@Component({
  selector: 'app-error-message-holder',
  templateUrl: './error-message-holder.component.html',
  styleUrls: ['./error-message-holder.component.css']
})
export class ErrorMessageHolderComponent implements OnInit, OnDestroy {

  private errorMessages: string[] = [];

  constructor(private errorMessagesHolderService: ErrorMessagesHolderService) { 
    errorMessagesHolderService.getErrorMessagesObs().subscribe(
      errorMessages =>{
        this.errorMessages = errorMessages;
        if (errorMessages.length > 0) {
          this.show();
        } else {
          this.hide();
        }
      }
    )
  }


  ngOnInit() {
  }


  ngOnDestroy(): void {
    
  }

  clearMessages() {
    this.errorMessagesHolderService.clearMessages();
  }

  show() {
    $("#errorModal").modal('show');
  }

  hide() {
    $("#errorModal").modal('hide');
  }
}
