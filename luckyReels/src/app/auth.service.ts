import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*To do:
  catch sign in response
  save in localstorage or cookie token
  firebase endpoint*/

  constructor(public afAuth: AngularFireAuth) {
    localStorage.clear();
  }
  userEmail:string = '';
  firebaseAccountKey:string = '{}';
  

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('Login successful');
    console.log(this.afAuth.authState);
    this.firebaseAccountKey =  JSON.parse(localStorage.getItem('fb_key') || '{}');
    console.log(this.firebaseAccountKey)
    return this.afAuth.authState;
  }

  signup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log('registered');
    return
  }

  logout() {
    this.afAuth.signOut();
    localStorage.clear();
    console.log('logout successful');
    return 
  }
}
