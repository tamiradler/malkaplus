import { Component, OnInit } from '@angular/core';
import { UserRestControllerService } from 'src/swaggergenerate/services';
import { UserService } from '../user.service';
import { User as SwaggerUser } from 'src/swaggergenerate/models';
import { User } from '../user';
import { ErrorMessagesHolderService } from '../error-messages-holder-service';
import { LoadSpinnerService } from '../load-spinner/load-spinner-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  emailToSearch: string;
  user: SwaggerUser;
  skills: string[];

  constructor(private userRestControllerService: UserRestControllerService, 
    private userService: UserService,
    private errorMessagesHolderService: ErrorMessagesHolderService,
    private loadSpinnerService: LoadSpinnerService) { }

  ngOnInit() {
    this.loadAvailableSkills();
  }

  getUser() {
    this.user = null;
    let user: User = this.userService.getUpdatedUser();
    let getUserUsingGETParams: UserRestControllerService.GetUserUsingGETParams = {
      authTokenId: user.tokenId,
      email: this.emailToSearch
    };
    this.loadSpinnerService.addRequestor('getUser');
    this.userRestControllerService.getUserUsingGET(getUserUsingGETParams).subscribe(
      user => {
        this.loadSpinnerService.removeRequestor('getUser');
        this.user = user;
      },
      error => {
        this.loadSpinnerService.removeRequestor('getUser');
        console.log(error);
        this.errorMessagesHolderService.addMessage('Cannot find the user.');
      }
    )
  }


  loadAvailableSkills() {
    this.userRestControllerService.getSkillsUsingGET().subscribe(skills => {
      this.skills = skills;
    })
  }


  addSkill(event) {
    let newSkill: string = event.target.innerText;
    let user: User = this.userService.getUpdatedUser();
    let addSkillToUserUsingPOSTParams: UserRestControllerService.AddSkillToUserUsingPOSTParams = {
      authTokenId: user.tokenId,
      newSkill: newSkill,
      userId: this.user.id
    }
    this.loadSpinnerService.addRequestor('addSkill');
    this.userRestControllerService.addSkillToUserUsingPOST(addSkillToUserUsingPOSTParams).subscribe(
      user => {
        this.loadSpinnerService.removeRequestor('addSkill');
        this.user = user;
      },
      error => {
        this.loadSpinnerService.removeRequestor('addSkill');
        this.errorMessagesHolderService.addMessage('Error in adding the skill.');
      }
    )
  }

}
