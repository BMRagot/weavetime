import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;


//  @ViewChild('myTabs') tabRef: Tabs;

//  ionViewDidEnter() {
//    this.tabRef.select(2);
//   }
//constructor (){}

 constructor(public navCtrl: NavController) {
   //window.localStorage.removeItem('currentuser');
   if (!this.isLoggedin()) {
     console.log('You are not logged in');
     this.navCtrl.push(LoginPage);
   }
 }

 isLoggedin() {
   if (window.localStorage.getItem('currentuser')) {
     return true;
   }
 }
}
