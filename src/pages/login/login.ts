import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import firebase from 'firebase';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  password: any;
  public loading:Loading;
  public loginForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public angfire: AngularFire) {
      this.loginForm = formBuilder.group({
         email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
         password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if (!this.loginForm.valid){
       console.log(this.loginForm.value);
     } else {
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
    {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
        console.log('Login success' + JSON.stringify(response));
        if(!response.auth.emailVerified){
            //user email not verified
            this.loading.dismiss().then( () => {
              let alert = this.alertCtrl.create({
                message: "Please, check your email to validate your account creation",
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
            alert.onDidDismiss(() => {
            // this.navCtrl.push(LoginPage);
                this.loginForm.reset()
            });

           alert.present();

         })
        }else{
          firebase.database().ref('/userProfile').child(response.auth.uid).once("value")
  .then(function(snapshot) {
    let currentuser = snapshot;
console.log(JSON.stringify(currentuser));
window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
})
          // let currentuser = {
          //   email: response.auth.email,
          //   picture: response.auth.photoURL
          // };


          //this.navCtrl.pop();
        //  this.navCtrl.push(TabsPage);

          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(TabsPage);
          })

        }
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

  goToSignup() {
     this.navCtrl.push(SignupPage);
 }

  goToResetPassword(){ this.navCtrl.push('reset-password'); }

}
