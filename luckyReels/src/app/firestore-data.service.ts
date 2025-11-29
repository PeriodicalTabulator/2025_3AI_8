import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  private userDataSubject = new BehaviorSubject<User[]>([]);
  userData$ = this.userDataSubject.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.getDataOfSingleUser(user.uid).subscribe();
      } else {
        this.userDataSubject.next([]);
      }
    });
  }

  async addUser(user: User) {
    this.firestore.collection('userData').doc(user.uid).set(user);

    const currentUsers = this.userDataSubject.getValue();
    this.userDataSubject.next([...currentUsers, user]);
    return;
  }

  updateWallet(uid: string, amount: number) {
    this.firestore.collection('userData').doc(uid).update({ wallet: amount });

    const currentUsers = this.userDataSubject.getValue();
    if (currentUsers && currentUsers.length > 0) {
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid) {
          return { ...user, wallet: amount };
        }
        return user;
      });
      this.userDataSubject.next(updatedUsers);
    }
  }

 
  updateLifetimeCoins(uid: string, amount: number) {
 
  this.firestore.collection('userData').doc(uid).update({ lifetimeCoins: amount });

 
  const currentUsers = this.userDataSubject.getValue();
  if (currentUsers && currentUsers.length > 0) {
    const updatedUsers = currentUsers.map(user => {
      if (user.uid === uid) {
        return { ...user, lifetimeCoins: amount };
      }
      return user;
    });
    this.userDataSubject.next(updatedUsers);
  }
}


  updateChartValueSlots(uid: string, amount: number) {
    this.firestore.collection('userData').doc(uid).update({ slotsPlayed: amount });

    const currentUsers = this.userDataSubject.getValue();
    if (currentUsers && currentUsers.length > 0) {
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid) {
          return { ...user, slotsPlayed: amount };
        }
        return user;
      });
      this.userDataSubject.next(updatedUsers);
    }
  }

  updateChartValueBlackJack(uid: string, amount: number) {
    this.firestore.collection('userData').doc(uid).update({ blackJackPlayed: amount });

    const currentUsers = this.userDataSubject.getValue();
    if (currentUsers && currentUsers.length > 0) {
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid) {
          return { ...user, blackJackPlayed: amount };
        }
        return user;
      });
      this.userDataSubject.next(updatedUsers);
    }
  }

  updateChartValueBeancan(uid: string, amount: number) {
    this.firestore.collection('userData').doc(uid).update({ beancanPlayed: amount });

    const currentUsers = this.userDataSubject.getValue();
    if (currentUsers && currentUsers.length > 0) {
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid) {
          return { ...user, beancanPlayed: amount };
        }
        return user;
      });
      this.userDataSubject.next(updatedUsers);
    }
  }

  getDataOfSingleUser(uid: string): Observable<User[]> {
    return this.getDataBasedOnField('uid', uid).pipe(
      tap(users => {
        if (users && users.length > 0) {
          this.userDataSubject.next(users);
        }
      })
    );
  }

  getDataBasedOnField(field: string, value: string): Observable<User[]> {
    return this.firestore
      .collection<User>('userData', ref => ref.where(field, '==', value))
      .valueChanges({ idField: 'docId' });
  }

  getCurrentUserData(): User[] {
    return this.userDataSubject.getValue();
  }
}
