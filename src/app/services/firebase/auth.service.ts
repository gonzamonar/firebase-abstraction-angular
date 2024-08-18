import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Persistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { inMemoryPersistence, setPersistence } from 'firebase/auth';

export interface LoginResult {
  error: boolean;
  content: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
  ) { }

  async login(email: string, password: string, persistence: Persistence = inMemoryPersistence): Promise<LoginResult> {
    return setPersistence(this.auth, persistence)
      .then(() =>
        signInWithEmailAndPassword(this.auth, email, password)
        .then(
          async (userCredential) => {
            if (userCredential == null){
              return { error: true, content: userCredential };
            } else {
              return { error: false, content: userCredential };
            }
          }
        ).catch((e) => {
          return {error: true, content: e};
        })
      )
    .catch((e) => {
      return {error: true, content: e};
    });
  }

  async logout(){
    return signOut(this.auth);
  }

}
