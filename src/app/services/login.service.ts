import { Injectable } from '@angular/core';
import { browserLocalPersistence, inMemoryPersistence } from '@angular/fire/auth';
import { AuthService } from './firebase/auth.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public authService: AuthService,
    public loader: LoaderService,
  ) { }
  
  async login(email: string, password: string, remember: boolean = false): Promise<boolean> {
    let persistence = remember ? browserLocalPersistence : inMemoryPersistence ;
    this.loader.setLoading(true);

    return this.authService.login(email, password, persistence)
    .then(
      (response) => {
        this.loader.setLoading(false);
        return response.error;
      }
    );
  }

  logout(){
    
  }

  register(){
    
  }
}
