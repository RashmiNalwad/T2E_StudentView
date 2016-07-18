import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/assignment-instructions/assignment-instructions.html',
})
export class AssignmentInstructionsPage {
  title: string;
  description: string;
  max_response_duration_min: number;
  assigned_on: string;//TODO : change to Date
  soft_deadline_due: string;//TODO : change to Date
  hard_deadline_due: string;//TODO : change to Date

  constructor(public nav: NavController, navParams:NavParams, private dataService:Data) {

    this.title = navParams.get('title');

    this.dataService.getAssignmentInfo(this.title).then((assignment_info) => {
            if (assignment_info) {
                console.log(assignment_info);
                this.description                     = assignment_info.description;
                this.max_response_duration_min       = assignment_info.max_response_duration_min;
                this.assigned_on                     = assignment_info.assigned_on;
                this.soft_deadline_due               = assignment_info.soft_deadline_due;
                this.hard_deadline_due               = assignment_info.hard_deadline_due;
                /*this.teacher_reviewed                = assignment_info.teacher_reviewed;
                this.teacher_yet_to_review           = assignment_info.teacher_yet_to_review;
                this.responses                       = assignment_info.responses;
                for(var student in this.responses){
                    this.displayStudentResponse(student, this.responses[student].attachmentUrl, this.responses[student].teacher_reviewed
                    );
                }*/
            }
        })
  }
}
