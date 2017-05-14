import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  //public avatar:any;
  //public user: FirebaseListObservable<any>;
  public user: any;
  public account : any;
  public db: AngularFireDatabase;

  constructor(public navCtrl: NavController,private database: AngularFireDatabase) {
    if (window.localStorage.getItem('currentuser')) {
      //this.avatar ="https://firebasestorage.googleapis.com/v0/b/testbibi-31b73.appspot.com/o/user-pic%2FALLAIN.jpg"
      this.user = JSON.parse(window.localStorage.getItem('currentuser'));
      console.log(this.user);
    //  this.getWtAccount(this.user.uid);
      this.db =database
      let self =this
      firebase.database().ref('/wtAccount').child(this.user.uid).once("value").then(function(snapshot) {
          self.account = snapshot.val();
          console.log(self.account)
      })
      this.account = {'wttoconvert': 0, 'wttogive': 0}
//this.account=database.list('/wtAccount/'+this.user.uid , { preserveSnapshot: true});
// this.account=firebase.database.list('/wtAccount/'+this.user.uid).getValue();
  //console.log(database.list('/wtAccount/'+this.user.uid).getValuewttogive);

      console.log(this.account)
    }else{
      console.log('You are not logged in');
      this.navCtrl.push(LoginPage);
    }
  }
ionViewWillEnter(){

  let self =this
  this.user = JSON.parse(window.localStorage.getItem('currentuser'));
  firebase.database().ref('/wtAccount').child(this.user.uid).once("value").then(function(snapshot) {
      self.account = snapshot.val();
      console.log(self.account)
  })
}
//   let self = this;
// this.db.list('/wtAccount/'+this.user.uid, { preserveSnapshot: true }).subscribe((snapshot) => {
//             self.account = snapshot
//         });
// console.log(self.account)
// }

  // ionViewDidLoad() { // THERE IT IS!!!
  //   this.user = JSON.parse(window.localStorage.getItem('currentuser'));
  //     this.account =  this.getWtAccount(this.user.uid);
  //       console.log(this.account)
  //  }

  getWtAccount(uid) {
    firebase.database().ref('/wtAccount').child(uid).once("value").then((snapshot) => {
      this.setWtAccount(snapshot.val());
        console.log(this.account)
      //return this.account
        //console.log('account' + this.account)
    }).catch((error) => {
      console.log(error);
    })
  }
  setWtAccount(data){
    this.account =data;
  }
  goToExplore(){
    this.navCtrl.push(ContactPage);
  }

}
