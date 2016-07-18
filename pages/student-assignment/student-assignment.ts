import {Component, Input} from '@angular/core';
import {NavController, IONIC_DIRECTIVES} from 'ionic-angular';
import {Data} from '../../providers/data/data';
import {Lib} from '../../providers/lib/lib';

@Component({
    templateUrl: 'build/pages/student-assignment/student-assignment.html',
    selector: 'student-assignment',
    directives: [IONIC_DIRECTIVES]
})
export class StudentAssignment {
    @Input() student_id: string;
    @Input() response: any;
    @Input() reviewed: boolean;
    @Input() title: string;
    submitted_on: string;
    constructor(private nav:NavController,private dataService:Data, private lib: Lib) {

    }

    ngOnInit(){
        //console.log(this.response);
        let d = new Date(this.response.submittedOn);
        this.submitted_on = d.toLocaleString()//d.toDateString();
    }

    submitReview(){
      var obj = this;
      this.reviewed = true;
      this.response.teacher_reviewed = true;
      console.log(this.title);
      console.log(this.student_id);
      console.log(this.response);
      this.dataService.submitReview(this.title, this.student_id, this.response.teacher_reviewed, this.response.teacher_feedback).then(function(response){
        if(response["ok"] == true){
          let toastmsg = obj.lib.showToastMsgWithCloseButton("Succesfully Submitted Review");
          obj.nav.present(toastmsg);
        }else{
          let toastmsg = obj.lib.showToastMsgWithCloseButton("Unable to submit review, Try Again");
          obj.nav.present(toastmsg);
        }
      });
    }
}
