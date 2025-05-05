import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*To do:
  catch sign in response
  save in localstorage or cookie token
  firebase endpoint*/

  constructor(public afAuth: AngularFireAuth) {
  }
  
  userEmail:string = '';
  

  async login(email: string, password: string) {
   return this.afAuth.signInWithEmailAndPassword(email, password);
    
  }

  showUID(): Observable<string> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (!user) throw new Error('No user logged in');
        return user.uid;
      })
    );
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
function resolve(uid: string) {
  throw new Error('Function not implemented.');
}

