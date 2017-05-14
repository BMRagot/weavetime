import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { SignupPage } from '../pages/signup/signup';


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAKKow5rwahuz55_BLyNgS1gj80DH7wT5g",
    authDomain: "testbibi-31b73.firebaseapp.com",
    databaseURL: "https://testbibi-31b73.firebaseio.com",
    projectId: "testbibi-31b73",
    storageBucket: "testbibi-31b73.appspot.com",
    messagingSenderId: "652096049516"
  };



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TabsPage,
    SignupPage,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
