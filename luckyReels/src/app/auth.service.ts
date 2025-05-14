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

  signin:boolean = false;
  uidUser: string = String(this.showUID())

  async login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
    this.signin = true;
   return 
  }

  

  showUID(): Observable<string> | null {
    if(this.signin == true){
    return this.afAuth.authState.pipe(
      map((user) => {
      if (!user) return '';
        return user.uid;
      })
    );
  }
  return null
  }
  
  observableToString(showUID: Observable<string>){
     showUID.subscribe(uid => `${uid}`)
    return showUID
  }

  async signup(email: string, password: string): Promise<firebase.auth.UserCredential>  {
   return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
    return 
  }

}


