import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import firebase from 'firebase';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  email: any;
  password: any;
  name : any;
  surname : any;
  public loading:Loading;
  public signupForm: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public angfire: AngularFire) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    this.angfire.auth.createUser({
      email: this.email,
      password: this.password
    }).then((response) => {
        console.log('Login success' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };
        //this.angfire.auth.getAuth().auth.updateProfile({ 'displayName': "Jane Q. User"});
        firebase.storage().ref().child('user-pic/'+ this.name.toUpperCase() +".jpg").getDownloadURL().then((resp)=>{
console.log( "ljljk"+ resp);
        firebase.database().ref('/userProfile').child( response.auth.uid)
        .set({ email: response.auth.email,
            name : this.name,
            surname : this.surname,
            avatar : resp
         });
        console.log(firebase.storage().ref().child('user-pic/'+ this.name.toUpperCase() +".jpg").getDownloadURL());
        this.angfire.auth.getAuth().auth.sendEmailVerification().then(function() {

  // Email sent.
    console.log("run");
}, function(error) {
  console.log("rfzz");

  // An error happened.
  console.log(JSON.stringify(error));
    });
})
        //window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        //this.navCtrl.pop();
      //  this.navCtrl.push(TabsPage);

        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: JSON.stringify(response),
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
          //this.navCtrl.setRoot(TabsPage);
        });



      }).catch((error) => {
        console.log(error);

        this.loading.dismiss().then( () => {
       let alert = this.alertCtrl.create({
         message: error.message,
         buttons: [
           {
             text: "Ok",
             role: 'cancel'
           }
         ]
       });
       alert.present();
     });
    })
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }


}
