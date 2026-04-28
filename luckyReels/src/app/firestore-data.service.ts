import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject,Subject, Observable, Subscription, map, tap, takeUntil, switchMap, EMPTY, delay, } from 'rxjs';
import { UserBets } from './user-bets';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  private socket$!: WebSocketSubject<any>;
private destroy$ = new Subject<void>();

private userDataSubject = new BehaviorSubject<User[]>([]);
userData$ = this.userDataSubject.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.connect();

    this.auth.user$
  .pipe(
    takeUntil(this.destroy$),
    switchMap(user => {
      if (!user) {
        this.userDataSubject.next([]);
        return EMPTY;
      }
      return this.getDataOfSingleUser(user.uid); 
    }))
  .subscribe(users => {
    this.userDataSubject.next(users);

    
    if (this.socket$) {
      this.sendUser(users);
    }
  });
    
  }
  private connect(): void {
    this.socket$ = webSocket({
      url: 'ws://localhost:8048/ws',
      openObserver: {
        next: () => {
          console.log('WS connected');
  
          const users = this.userDataSubject.value;
          this.sendUser(users)
        }
      },
      closeObserver: {
        next: () => console.log('WS closed')
      }
    });
  
    this.socket$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: msg => console.log('Received:', msg),
        error: err => console.error('WS error:', err)
      });
  }
  
  public sendUser(user: User[]): void{
    if (!this.socket$) {
      console.error('WebSocket not initialized');
      return;
    }
  
    this.socket$.next({
      type: 'User',
      payload: user
    });
  }


  async addUser(user: User, userBets: UserBets){
    this.firestore.collection('userData').doc(user.uid).set(user);
   // this.firestore.collection('userBets').doc(user.uid).set(uidForBets); wont work expected object
    this.firestore.collection('userBets').add(userBets);
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
  //need to merge these 3 functions in one dynamic based on played game (this is only temporary solution)
  getDataOfSingleUser(uid: string):Observable<User[]>{
    return this.getDataBasedOnField('uid', uid).pipe(
      tap(users => {
        if(users && users.length > 0){
          this.userDataSubject.next(users)
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


  private api = 'http://127.0.0.1:8048';

  getRandom(){
    return this.http.get<number>(`${this.api}/randomNumber`);
  }
}
