import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { FirestoreDataService } from '../firestore-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  subscription: Subscription | null = null;
  userData: User[] | null = null;
  isDataLoaded: boolean = false;
  constructor(private dataService : FirestoreDataService , private authService: AuthService){}
  ngOnInit():void{
    this.subscription = this.dataService.userData$.subscribe(users => {
        this.userData = users || [];
        this.isDataLoaded = users && users.length > 0;
        console.log('received user data:', users);
        
        if (!this.isDataLoaded) {
          this.loadUserData();
        }
      });
  }
  
  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  
  loadUserData(){
       const uid = this.authService.getUID();
      if (!uid) {
        console.log('No user ID available');
        return;
      }
  
      this.dataService.getDataOfSingleUser(uid).subscribe();
  }
}
