import {Page, Alert, NavController, NavParams, Toast} from 'ionic-angular';
import {ClassGroupPage} from '../class-group/class-group';
import {Data} from '../../providers/data/data';
import {Lib} from '../../providers/lib/lib';

@Page({
  templateUrl: 'build/pages/teacher-home/teacher-home.html',
})
export class TeacherHomePage {
  email: string;
  myClasses = [];
  constructor(public nav: NavController, navParams: NavParams, private dataService: Data, private lib: Lib) {
    this.email = navParams.get('uname');
  }

  ionViewWillEnter(){
    this.dataService.getUserInfo(this.email).then((userInfo) => {
      if(userInfo){
        this.myClasses = userInfo["class_subject"];
      }
    })
  }

  goTo_Class(className){
    this.nav.push(ClassGroupPage, {classGrp: className})
  }

  addNewClass(){
    let prompt = Alert.create({
      title: 'New Class Group',
      message: "Enter name of class and subject",
      inputs: [
        {
          name: 'className',
          placeholder: 'Class'
        },
        {
          name: 'subject',
          placeholder: 'Subject'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let classgrp = (data.className + "_" + data.subject).toUpperCase();
            var obj = this;
            this.dataService.addClassGrp(classgrp, this.email).then(function(response){
              console.log(response);
              if(response["status"] == 409){
                console.log(response);
                let toastmsg = obj.lib.showToastMsgWithCloseButton(classgrp + " already exits !!!");
                obj.nav.present(toastmsg);
              }else{
                obj.myClasses.push(classgrp);
              }
            });

          }
        }
      ]
    });
    this.nav.present(prompt);
  }

}
