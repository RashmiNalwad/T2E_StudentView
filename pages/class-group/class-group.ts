import {Component} from '@angular/core';
import {NavController, NavParams, Alert} from 'ionic-angular';
import {ChapterPage} from '../chapter-page/chapter-page';
import {Data} from '../../providers/data/data';
import {Lib} from '../../providers/lib/lib';

@Component({
  templateUrl: 'build/pages/class-group/class-group.html',
})
export class ClassGroupPage {
  classGrp: string;
  chapters = [];
  chapter_assignments = {};

  constructor(public nav: NavController, navParams: NavParams, private dataService: Data, private lib: Lib) {
    this.classGrp = navParams.get('classGrp');
  }

  ionViewWillEnter(){
    this.chapters = [];
    this.chapter_assignments = {};
    this.dataService.getChapters(this.classGrp).then((classInfo) => {
      if(classInfo){
        for(let chapter in classInfo["chapters"]){
          this.chapters.push(chapter);
          this.chapter_assignments[chapter] = classInfo["chapters"][chapter]["assignments"];
          //for(let chaptername in chapter){
          //  this.chapters.push(chaptername);
            //this.chapter_assignments[chaptername] = [];
            //this.chapter_assignments[chaptername]["no_of_assignments"] = 0;
            //console.log(chapter[chaptername].assignments);
            //this.chapter_assignments[chaptername] = chapter[chaptername].assignments;
            //this.chapter_assignments[chaptername]["no_of_assignments"] = chapter[chaptername].assignments.length;
          //}
        }
        console.log(this.chapter_assignments);
    }
    })
  }

  addNewChapter(){
    let prompt = Alert.create({
      title: 'New Chapter',
      message: "Enter name of chapter",
      inputs: [
        {
          name: 'chapter',
          placeholder: 'Chapter'
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
            let chapter = data.chapter.toUpperCase();
            var obj = this;
            this.dataService.addChapter(chapter, this.classGrp).then(function(response){
              if(response["ok"] == true){
                obj.chapters.push(chapter);
                //obj.chapter_assignments[chapter] = [];
              }else{
                let toastmsg = obj.lib.showToastMsgWithCloseButton("unable to add chapter : " + chapter);
                obj.nav.present(toastmsg);
              }
            });
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

  openChapter(chapterTitle){
    this.nav.push(ChapterPage, {className: this.classGrp, chapter: chapterTitle, assignments: this.chapter_assignments[chapterTitle]})
    //this.nav.push(ChapterPage, {className: this.classGrp, chapter: chapterTitle})
  }
}
