import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { firstValueFrom, Observable } from 'rxjs';
import { setDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: AngularFirestore, private http: HttpClient, private auth:AuthService
  ) { }


  async addUser(user: User ){
    this.firestore.collection('userData').doc(user.uid), user
    //this.firestore.collection('userData').add(user);
    return
  }
  
 getDataOfSingleUser(uid: string) {
  return this.getDataBasedOnField('uid', uid);
}

  getDataBasedOnField(field: string, value: string){
    return this.firestore.collection('userData', ref => ref.where(field, '==', value))
  }
}
