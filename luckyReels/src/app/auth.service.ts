import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: string = '';
  /*To do:
  catch sign in response
  save in localstorage or cookie token
  firebase endpoint*/

  constructor(public afAuth: AngularFireAuth) {
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
    this.userEmail = email;
    return 
  }

  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
