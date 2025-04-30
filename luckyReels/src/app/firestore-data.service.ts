import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: AngularFirestore, private http: HttpClient, private auth:AuthService
  ) { }


  async addUser(user: User ){
    this.firestore.collection('userData').add(user);
    return
  }
  
  getUID(){
    this.auth.showUID();
  }

  getDataBasedOnField(field: string, value: string){
    return this.firestore.collection('userData', ref => ref.where(field, '==', value))
  }
}
