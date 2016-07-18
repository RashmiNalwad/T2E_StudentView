import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

/*
  Generated class for the AssignDescriptionModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/assign-description-modal/assign-description-modal.html',
})
export class AssignDescriptionModalPage {

  assign_description:string;
  assignment:string;
  max_response_time = 0;
  assigned_on:string;

  constructor(public nav: NavController,public params: NavParams) {
    this.assign_description = this.params.get('description');
    this.assignment = this.params.get('assignment');
    this.max_response_time = this.params.get('max_response_time');
    this.assigned_on = this.params.get('assigned_on');
  }
}
