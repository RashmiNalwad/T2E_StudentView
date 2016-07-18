import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {AssignmentInstructionsPage} from '../assignment-instructions/assignment-instructions';
import {AssignmentToReviewPage} from '../assignment-to-review/assignment-to-review';
import {AssignmentReviewedPage} from '../assignment-reviewed/assignment-reviewed';

@Component({
    templateUrl: 'build/pages/assignment-page/assignment-page.html',
})
export class AssignmentPage {
    private tab1Root: any;
    private tab2Root: any;
    private tab3Root: any;

    title: string;
    
    constructor(public nav: NavController, navParams:NavParams) {
        this.title = navParams.get('assignment');
        console.log(this.title);
        
        this.tab1Root = AssignmentInstructionsPage;
        this.tab2Root = AssignmentToReviewPage ;
        this.tab3Root = AssignmentReviewedPage;
    }

    /*getStudentResponse(student){
        return this.responses[student];
    }
    
    displayStudentResponse(student, url, teacher_reviewed){

        var responsediv = document.getElementById("responses");
        console.log(student);
        /*let videoFrame = document.createElement("iframe");
        videoFrame.width = "200"; videoFrame.height = "200"; videoFrame.src = url;
        responsediv.appendChild(videoFrame);

        let ionCard = document.createElement("ion-card");
        
            let ionItem = document.createElement("ion-item");//<ion-item>
            
                let ionAvatar = document.createElement("ion-avatar");//<ion-avatar item-left>
                ionAvatar.setAttribute("item-left","");
                let avatarImg = document.createElement("img");
                avatarImg.setAttribute("src","http://cdn2.iconfinder.com/data/icons/professions/512/student_graduate_boy_profile-512.png");
                ionAvatar.appendChild(avatarImg);
                ionItem.appendChild(ionAvatar);

                let h2Name = document.createElement("h2");
                h2Name.appendChild(document.createTextNode("Marty McFly"));
                ionItem.appendChild(h2Name);
            ionCard.appendChild(ionItem);

            let videoFrame = document.createElement("iframe");
            //videoFrame.width = "200"; videoFrame.height = "200"; 
            videoFrame.src = url;
            ionCard.appendChild(videoFrame);

            let commentItem = document.createElement("ion-item");
                let commentLabel = document.createElement("ion-label");
                commentLabel.setAttribute("stacked","");
                commentLabel.appendChild(document.createTextNode("Feedback Comment"));
                commentItem.appendChild(commentLabel);

                let commentArea = document.createElement("textarea");
                //commentArea.setAttribute("[(ngModel)]", "msg");  
                commentItem.appendChild(commentArea);

            ionCard.appendChild(commentItem);            

        responsediv.appendChild(ionCard);
    }*/
}
