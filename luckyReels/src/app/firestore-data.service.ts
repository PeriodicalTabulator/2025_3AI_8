import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserBets } from './user-bets';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  private userDataSubject = new BehaviorSubject<User[]>([]);
  userData$ = this.userDataSubject.asObservable();
  constructor(private firestore: AngularFirestore, private http: HttpClient, private auth:AuthService
  ) { 
    this.auth.user$.subscribe(user =>{
      if(user){
        this.getDataOfSingleUser(user.uid).subscribe()
      }else{
        this.userDataSubject.next([])
      }
    })
  }


  async addUser(user: User, userBets: UserBets){
    this.firestore.collection('userData').doc(user.uid).set(user);
   // this.firestore.collection('userBets').doc(user.uid).set(uidForBets); wont work expected object
    this.firestore.collection('userBets').add(userBets);
     const currentUsers = this.userDataSubject.getValue();
    this.userDataSubject.next([...currentUsers, user]);
    return
  }

  updateWallet(uid: string, amount: number){
    this.firestore.collection('userData').doc(uid).update({wallet : amount
    })

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
//1
  updateChartValueSlots(uid:string, amount: number){
    this.firestore.collection('userData').doc(uid).update({slotsPlayed : amount })

    const currentUsers = this.userDataSubject.getValue();
    if(currentUsers && currentUsers.length > 0){
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid){
          return{...user, slotsPlayed : amount};
        }
        return user
      });
      this.userDataSubject.next(updatedUsers);
    }
  }
//2
  updateChartValueBlackJack(uid:string, amount: number){
    this.firestore.collection('userData').doc(uid).update({blackJackPlayed : amount })

    const currentUsers = this.userDataSubject.getValue();
    if(currentUsers && currentUsers.length > 0){
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid){
          return{...user, blackJackPlayed : amount};
        }
        return user
      });
      this.userDataSubject.next(updatedUsers);
    }
  }
//3
  updateChartValueBeancan(uid:string, amount: number){
    this.firestore.collection('userData').doc(uid).update({beancanPlayed : amount })

    const currentUsers = this.userDataSubject.getValue();
    if(currentUsers && currentUsers.length > 0){
      const updatedUsers = currentUsers.map(user => {
        if (user.uid === uid){
          return{...user, beancanPlayed : amount};
        }
        return user
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

  getDataBasedOnField(field: string, value: string):Observable<User[]>{
    return this.firestore
      .collection<User>('userData', ref => ref.where(field, '==', value))
      .valueChanges({ idField: 'docId' });
    }

      getCurrentUserData(): User[] {
   
     return this.userDataSubject.getValue();
  }

}
