import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseListObservable } from 'angularfire2';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  //public avatar:any;
  public user: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController) {
    // if (!this.isLoggedin()) {
    //
    //   console.log('You are not logged in');
    //   this.navCtrl.push(LoginPage);
    // }
    if (window.localStorage.getItem('currentuser')) {
      //this.avatar ="https://firebasestorage.googleapis.com/v0/b/testbibi-31b73.appspot.com/o/user-pic%2FALLAIN.jpg"
     this.user = JSON.parse(window.localStorage.getItem('currentuser'));
      console.log(this.user);
    }else{

      console.log('You are not logged in');
      this.navCtrl.push(LoginPage);
    }

  }

  isLoggedin() {
    if (window.localStorage.getItem('currentuser')) {
      //this.avatar ="https://firebasestorage.googleapis.com/v0/b/testbibi-31b73.appspot.com/o/user-pic%2FALLAIN.jpg"
      let user = JSON.parse(window.localStorage.getItem('currentuser'));
      console.log(user);
            //this.avatar =user.avatar
      return true;
    }
  }

}
