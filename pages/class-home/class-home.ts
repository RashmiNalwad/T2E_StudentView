import {Component} from '@angular/core';
import {NavController, Alert, NavParams} from 'ionic-angular';
import {TeacherHomePage} from '../teacher-home/teacher-home';

@Component({
  templateUrl: 'build/pages/class-home/class-home.html',
})
export class ClassHomePage {
  className: string;
  constructor(public nav: NavController, navParams: NavParams) {
    this.className = navParams.get('classGrp');
  }
  goHome(){
    this.nav.setRoot(TeacherHomePage);
  }
  addNewChapter(){
    let prompt = Alert.create({
      title: 'New Chapter',
      message: "Enter name of chapter",
      inputs: [
        {
          name: 'chapter',
          placeholder: 'Chaoter'
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
            console.log(data.chapter);
            //call db
            console.log('Added');
          }
        }
      ]
    });
    this.nav.present(prompt);
  }
}
