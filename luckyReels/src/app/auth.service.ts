import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<firebase.User | null>(null);

  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.user$.pipe(map (user => !!user));
  uid$ = this.user$.pipe(map(user => user?.uid))
  constructor(public afAuth: AngularFireAuth, private router: Router) {

    this.afAuth.authState.subscribe(user => {
      this.userSubject.next(user);
      if(user){
        user.getIdToken().then(token => {
          localStorage.setItem('token', token);
        })
      }else {
        localStorage.removeItem('token');
      }
    })
  }


  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
  const result = await this.afAuth.signInWithEmailAndPassword(email, password);
  return result
  }


   async signup(email: string, password: string): Promise<firebase.auth.UserCredential>  {
   return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  
  
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getCurrentUser(): firebase.User | null{
    return this.userSubject.value
  }

  getUID(): string | null{
    const user = this.getCurrentUser();
    return user ? user.uid : null
  }

}


