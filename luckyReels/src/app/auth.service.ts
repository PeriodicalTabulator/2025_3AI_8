import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
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
  

  async login(email: string, password: string) {
   return this.afAuth.signInWithEmailAndPassword(email, password);
    
  }

  async showUID(): Promise<string>{
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve('');
        }
      });
    });
  }  

  async signup(email: string, password: string): Promise<firebase.auth.UserCredential>  {
   return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
    localStorage.clear();
    return 
  }

}
