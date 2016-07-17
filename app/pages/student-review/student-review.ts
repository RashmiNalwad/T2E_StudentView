import {Component, Input} from '@angular/core';
import {Data} from '../../providers/data/data';
import {Lib} from '../../providers/lib/lib';
import {Modal, Platform, NavController, NavParams, ViewController,IONIC_DIRECTIVES,Alert} from 'ionic-angular';
import {StudentDetailReviewPage} from '../students-detail-review/students-detail-review';

@Component({
    templateUrl: 'build/pages/student-review/student-review.html',
    selector: 'student-review',
    directives: [IONIC_DIRECTIVES]
})

export class StudentReviewPage {
    @Input() assignment: string;
    @Input() response: {};
    @Input() email: string;
    @Input() studentGrade:string;
    @Input() classSelected:string;
    @Input() chapterSelected:string;

    assignment_dict = {};
    chapter_assignments = [];
    assignment_url:string;
    cumulative_rating;
    students_to_review = [];
    student = 0 ;
    questions = [];
    review_by:string;
    s1_status:boolean; //status to decide whether to put create icon or done-all icon.
    s2_status:boolean;
    s3_status:boolean;

    constructor(public nav: NavController,public platform: Platform,public params: NavParams,public viewCtrl: ViewController,private dataService: Data) {
    }

    ngOnInit(){
      this.dataService.getQuestions().then((questions_info) => {
         if(questions_info){
              this.questions =  questions_info["questions"];
         }
      }).catch(function(exception){
        console.log(exception);
      });

      this.dataService.getAssignments(this.studentGrade+"_"+this.classSelected, this.chapterSelected).then((assignmentsInfo) => {
        if (assignmentsInfo) {
          this.chapter_assignments = assignmentsInfo["assignments"];
              this.assignment_dict[this.assignment] = {};
              this.assignment_dict[this.assignment]["responses"] = {};
              this.assignment_dict[this.assignment]["peer_review_map"] = {};
              this.students_to_review = [];

            this.dataService.getAssignmentInfo(this.assignment).then((assignmentDetail_info) => {
                if (assignmentDetail_info) {
                    this.assignment_dict[this.assignment] = {};
                    this.assignment_dict[this.assignment] ["peer_review_map"] = assignmentDetail_info["peer_review_map"];
                    this.assignment_dict[this.assignment] ["responses"] = assignmentDetail_info["responses"];
                    this.assignment_url = this.assignment_dict[this.assignment] ["responses"][this.email]["attachmentUrl"];
                    this.cumulative_rating = this.assignment_dict[this.assignment] ["responses"][this.email]["cumulative_rating"];
                    this.students_to_review = this.assignment_dict[this.assignment]["peer_review_map"][this.email]["to_review"];
                    this.assignment_dict[this.assignment] ["review_by"] =  assignmentDetail_info["review_by"];
                    this.review_by = this.assignment_dict[this.assignment]["review_by"];
                    if(this.email in this.assignment_dict[this.assignment] ["responses"][this.students_to_review[0]]["peers_feedback"])
                    {
                       this.s1_status = true;
                    }
                    else
                    {
                      this.s1_status = false;
                    }
                    if(this.email in this.assignment_dict[this.assignment] ["responses"][this.students_to_review[1]]["peers_feedback"])
                    {
                       this.s2_status = true;
                    }
                    else
                    {
                      this.s2_status = false;
                    }
                    if(this.email in this.assignment_dict[this.assignment] ["responses"][this.students_to_review[2]]["peers_feedback"])
                    {
                       this.s3_status = true;
                    }
                    else
                    {
                      this.s3_status = false;
                    }
                }
            }).catch(function(exception){
              console.log(exception);
            });
        }
      });
    }

    openModal(studentNum) {
        let modal = Modal.create(StudentDetailReviewPage, { selectedStudent:studentNum,assignment:this.assignment,reviewer:this.email,questions:this.questions});
        this.nav.present(modal);
    }
}
