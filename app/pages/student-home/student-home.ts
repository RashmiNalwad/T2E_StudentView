import {Page, Alert, NavController, NavParams, Toast,App, Popover, Content} from 'ionic-angular';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Data} from '../../providers/data/data';
import {Lib} from '../../providers/lib/lib';
import {StudentCurrentPage} from "../student-current/student-current";
import {SettingsPopoverPage} from "../settings-popover/settings-popover";

@Page({
    templateUrl: 'build/pages/student-current/student-current.html',
})
class CurrentDetailsPage {
    item;
    public character

    constructor(params: NavParams) {
        this.item = params.data.item;
    }
}

@Page({
  templateUrl: 'build/pages/student-home/student-home.html',
})
export class StudentHomePage {
  email: string;
  class: string;//Selected Class Name
  root: string;
  items = []; //Classes
  chapters = [];//Chapters for a class
  db_subjects = [];//class subjects retrieved from database like Class9_Maths,Class9_Biology
  student_grade: string;// Student's grade like 8th standard,9th standard etc
  icons_names_map:{};//map of subject names and icons letter
  res:string;
  link:string;

  @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
  @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;


  constructor(public nav: NavController, navParams: NavParams, private dataService: Data, private lib: Lib) {
    this.email = navParams.get('uname');
    this.root = "courses";
  }

  ionViewWillEnter(){
    this.dataService.getUserInfo(this.email).then((userInfo) => {
      if(userInfo){
        this.db_subjects = userInfo["subjects"];
        this.items = [];
        this.icons_names_map = {};
        for(var sub of this.db_subjects){
            this.items.push(sub.split("_")[1]);
            this.student_grade = sub.split("_")[0];
            this.res = sub.split("_")[1].charAt(0);
            this.link = "http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/32/Letter-"+this.res+"-icon.png";
            // this.link = "http://icons.iconarchive.com/icons/iconicon/alpha-magnets/128/Letter-"+this.res+"-icon.png";
            this.icons_names_map[sub.split("_")[1]] = this.link;
        }
      }
    })
  }

  setChapters(){
    this.dataService.getChapters(this.class).then((chapterInfo) => {
      if(chapterInfo){
        this.chapters = chapterInfo["class"];
        console.log(chapterInfo);
      }
    })
  }

  openChapterDetailsPage(className){
      this.nav.push(StudentCurrentPage, { className: className, studentGrade: this.student_grade, email:this.email });
  }

  presentPopover(ev) {
    let popover = Popover.create(SettingsPopoverPage, {

    });

    this.nav.present(popover, {
      ev: ev
    });
  }
}
