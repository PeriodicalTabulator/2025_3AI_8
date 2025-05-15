import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: AngularFirestore, private http: HttpClient, private auth:AuthService
  ) { }


  async addUser(user: User ){
    this.firestore.collection('userData').doc(user.uid).set(user);
    return
  }
  
 getDataOfSingleUser(uid: string):Observable<User[]>{
  return this.getDataBasedOnField('uid', uid);
}

  getDataBasedOnField(field: string, value: string):Observable<User[]>{
    return this.firestore
      .collection<User>('userData', ref => ref.where(field, '==', value))
      .valueChanges({ idField: 'docId' });}
}
