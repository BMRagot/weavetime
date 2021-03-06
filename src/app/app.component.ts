import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage; //TabsPage;// HomePage;

  constructor(platform: Platform, statusbar: StatusBar, splashscreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusbar.styleDefault();
      //splashscreen.hide();
    });
  }
}
