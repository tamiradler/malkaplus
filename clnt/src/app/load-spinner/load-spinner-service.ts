import { Injectable } from '@angular/core';
import { LoadSpinnerComponent } from './load-spinner.component';



@Injectable({
  providedIn: 'root',
})
export class LoadSpinnerService {
    loadSpinnerComponent: LoadSpinnerComponent;
    constructor() {
       
    }

    private requestors: string[] = [];


    addRequestor(requestor: string) {
        this.loadSpinnerComponent.show();
        this.requestors.push(requestor);
    }


    removeRequestor(requestor: string) {
        var index = this.requestors.indexOf(requestor);
        if (index > -1) {
            this.requestors.splice(index, 1);
        }

        if (this.requestors.length == 0) {
            this.loadSpinnerComponent.hide();
        }
    }

    show() {
        this.loadSpinnerComponent.show();
    }
    

    hide() {
        this.loadSpinnerComponent.hide();
    }
}