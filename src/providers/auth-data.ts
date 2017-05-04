import { Injectable } from '@angular/core';
//import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
//import firebase from 'firebase';


import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthData {
    fireAuth: any;
    constructor(public af: AngularFireAuth) {
//    af.auth.subscribe( user => {
    af.subscribe( user => {
            if (user) {
                this.fireAuth = user.auth;
                console.log(user);
            }
        });
    }

    loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        return this.af.auth.login({ email: newEmail, password: newPassword });
    }

    resetPassword(email: string): firebase.Promise<any> {
      return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<any> {
        return this.af.auth.logout();
      }

    signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        return this.af.auth.createUser({
          email: newEmail,
          password: newPassword
        });
      }

}
