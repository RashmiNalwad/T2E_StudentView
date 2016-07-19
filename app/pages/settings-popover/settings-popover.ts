import {NavController} from 'ionic-angular';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, Popover, Content, NavParams} from 'ionic-angular';

/*
  Generated class for the SettingsPopoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/settings-popover/settings-popover.html',
})
export class SettingsPopoverPage {
  contentEle: any;
  textEle: any;

  constructor(public nav: NavController,public navParams: NavParams) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;
    }
  }
}
