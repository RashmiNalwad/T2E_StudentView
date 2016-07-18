import {Component, Input} from '@angular/core';
import {Data} from '../../providers/data/data';
import {Lib} from '../../providers/lib/lib';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import {Modal, Platform, NavController, NavParams, ViewController,IONIC_DIRECTIVES,Alert} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/students-detail-review/students-detail-review.html'
})
export class StudentDetailReviewPage {
    assignment_dict = {};
    chapter_assignments = [];
    assignment_url:string;
    student = 0;
    assignment:string;
    reviewer:string;
    students_to_review = [];
    reviewed:boolean;
    questions = [];
    ans_map:{};
    peers_feedback:{};
    ans1:string;
    ans2:string;
    ans3:string;
    url: SafeResourceUrl;

    constructor(private nav:NavController,public platform: Platform,public params: NavParams,public viewCtrl: ViewController,private dataService: Data,private lib: Lib,private sanitizer: DomSanitizationService) {
      this.student = this.params.get('selectedStudent');
      this.assignment = this.params.get('assignment');
      this.reviewer = this.params.get('reviewer');
      this.questions = this.params.get('questions');
    }

    ngOnInit(){
            this.dataService.getAssignmentInfo(this.assignment).then((assignmentDetail_info) => {
                if (assignmentDetail_info) {
                    this.assignment_dict[this.assignment] = {};
                    this.assignment_dict[this.assignment] ["peer_review_map"] = assignmentDetail_info["peer_review_map"];
                    this.assignment_dict[this.assignment] ["responses"] = assignmentDetail_info["responses"];
                    this.students_to_review = this.assignment_dict[this.assignment]["peer_review_map"][this.reviewer]["to_review"];
                    this.assignment_url = this.assignment_dict[this.assignment] ["responses"][this.students_to_review[this.student]]["attachmentUrl"];
                    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.assignment_url);//WARNING: calling this method with untrusted user data exposes your application to XSS security risks!
                    console.log(this.url);
                    this.peers_feedback = this.assignment_dict[this.assignment]["responses"][this.students_to_review[this.student]]["peers_feedback"];
                    if(this.reviewer in this.peers_feedback)
                    {
                       this.reviewed = true;
                       this.ans_map = this.assignment_dict[this.assignment]["responses"][this.students_to_review[this.student]]["peers_feedback"][this.reviewer];
                       this.ans1 = this.ans_map[this.questions[0]];
                       this.ans2 = this.ans_map[this.questions[1]];
                       this.ans3 = this.ans_map[this.questions[2]];
                    }
                    else
                    {
                      this.reviewed = false;
                    }
                }
            }).catch(function(exception){
              console.log(exception);
            });
        }

        submitReview(){
              var obj = this;
              this.reviewed = true;
              this.dataService.submitPeerFeedback(this.assignment,this.reviewer,this.students_to_review[this.student],this.questions[0], this.ans1, this.questions[1],this.ans2,this.questions[2],this.ans3).then(function(response){
                if(response["ok"] == true){
                  let toastmsg = obj.lib.showToastMsgWithCloseButton("Succesfully Submitted Review");
                  obj.nav.present(toastmsg);
                }else{
                  let toastmsg = obj.lib.showToastMsgWithCloseButton("Unable to submit review, Try Again");
                  obj.nav.present(toastmsg);
                }
              });
            }

    dismiss() {
      this.viewCtrl.dismiss();
    }

}
