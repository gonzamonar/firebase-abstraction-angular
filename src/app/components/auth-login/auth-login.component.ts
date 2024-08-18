import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
  encapsulation: ViewEncapsulation.None
})

export class AuthLoginComponent {
  email: string = '';
  password: string = '';
  rememberLogin: boolean = false;
  loginError: boolean = false;

  constructor(
    private login: LoginService,
  ){}

  LoginAuth() {
    this.loginError = false;

    this.login.login(this.email, this.password, this.rememberLogin)
    .then(
      (res) => {
        this.loginError = res;
      }
    );
  }

  code_authComponent = `
export class AuthLoginComponent {
  email: string = '';
  password: string = '';
  rememberLogin: boolean = false;
  loginError: boolean = false;

  constructor(private login: LoginService){}

  LoginAuth() {
    this.loginError = false;

    this.login.login(this.email, this.password, this.rememberLogin)
    .then((res) => {
        this.loginError = res;
    });
  }
}
`;

code_loginService = `
export class LoginService {
  
  constructor(public authService: AuthService) { }
  
  async login(email: string, password: string, remember: boolean = false): Promise&lt;boolean&gt; {
    let persistence = remember ? browserLocalPersistence : inMemoryPersistence ;

    return this.authService.login(email, password, persistence)
    .then(
      (response) => { return response.error; }
    );
  }
}
`;

code_loginServiceSpinner = `
<span class='highlight'></span>
<span class='highlight'></span>


export class LoginService {

  constructor(
    public authService: AuthService,
    <span class='highlight'>public loader: LoaderService,</span>
  ) { }
  
  async login(email: string, password: string, remember: boolean = false): Promise<boolean> {
    let persistence = remember ? browserLocalPersistence : inMemoryPersistence ;
    <span class='highlight'>this.loader.setLoading(true);</span>

    return this.authService.login(email, password, persistence)
    .then(
      (response) => {
        <span class='highlight'>this.loader.setLoading(false);</span>
        return response.error;
      }
    );
  }
}
`;

code_authService  = `
export interface LoginResult {
  error: boolean;
  content: any;
}

export class AuthService {
  
  constructor(private auth: Auth) { }

  async login(email: string, password: string, persistence: Persistence = inMemoryPersistence): Promise&lt;LoginResult&gt; {
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
}
`;
}
