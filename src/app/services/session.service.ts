import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUser: User | null = null;

  constructor(
    private auth: Auth
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        if (this.auth.currentUser){
          this.updateSession(this.auth.currentUser);
        }
      } else {
        this.closeSession();
      }
    });
  }

  updateSession(user: User){
    this.currentUser = user;
  }

  closeSession(){
    this.currentUser = null;
  }

  isSessionActive(){
    return this.currentUser != null;
  }

  getCurrentUser(): string {
    return this.currentUser?.email ? this.currentUser.email : "";
  }

}
