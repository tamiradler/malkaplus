import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class ErrorMessagesHolderService {
    private errorMessages: string[] = [];

    private errorMessagesObs: Observable<string[]>;
    private errorMessagesSubject: Subject<string[]>;

    constructor() {
        this.errorMessagesSubject = new Subject<string[]>();
        this.errorMessagesObs = this.errorMessagesSubject.asObservable();
        this.errorMessagesSubject.next([]);
    }


    addMessage(message: string) {
        this.errorMessages.push(message);
        this.errorMessagesSubject.next(this.errorMessages);
    }


    addMessages(messages: string[]) {
        this.errorMessages = this.errorMessages.concat(messages);
        this.errorMessagesSubject.next(this.errorMessages);
    }


    clearMessages() {
        this.errorMessages = [];
        this.errorMessagesSubject.next(this.errorMessages);
    }


    getErrorMessagesObs() {
        return this.errorMessagesObs;
    }
}