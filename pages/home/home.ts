import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {TeacherHomePage} from "../teacher-home/teacher-home";
import {StudentHomePage} from "../student-home/student-home";

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    constructor(private _navController:NavController) {
    }

    goTo_TeacherHome(name){
        this._navController.setRoot(TeacherHomePage, { uname: name });
    }

    goTo_StudentHome(name){
        this._navController.setRoot(StudentHomePage, { uname: name });
    }

    /*
     pushPage(){
     this._navController.push(SomeImportedPage, { userId: "12345"});
     }
     */
}
