import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: '../code.component.css',
  encapsulation: ViewEncapsulation.None
})

export class AuthLoginComponent {
  email: string = '';
  password: string = '';
  rememberLogin: boolean = false;
  loginError: boolean = false;

  constructor(
    private loginService: LoginService,
    public session: SessionService
  ){}

  LoginAuth() {
    this.loginError = false;

    this.loginService.login(this.email, this.password, this.rememberLogin)
    .then(
      (res) => {
        this.loginError = res;
        this.email = '';
        this.password = '';
      }
    );
  }

  code_authComponent = `
export class AuthLoginComponent {
  email: string = '';
  password: string = '';
  rememberLogin: boolean = false;
  loginError: boolean = false;

  constructor(private loginService: LoginService){}

  LoginAuth() {
    this.loginError = false;

    this.loginService.login(this.email, this.password, this.rememberLogin)
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
    .then((response) => {
        this.loader.setLoading(false);
        if (!response.error){
          this.notifier.popUpNotification("¡Bienvenido/a!");
          this.router.navigateByUrl("auth/logout");
        }
        return response.error;
    });
  }
}
`;

code_loginServiceSpinner = `
<a href="https://github.com/gonzamonar/firebase-abstraction-angular/blob/master/src/app/app.component.html" target="_blank">app.component.html</a>
<a href="https://github.com/gonzamonar/firebase-abstraction-angular/tree/master/src/app/components/spinner" target="_blank">spinner.component</a>
<a href="https://github.com/gonzamonar/firebase-abstraction-angular/blob/master/src/app/services/loader.service.ts" target="_blank">loader.service.ts</a>

export class LoginService {

  constructor(
    public authService: AuthService,
    <span class='highlight'>public loader: LoaderService,</span>
  ) { }
  
  async <span class='method'>login</span>(email: string, password: string, remember: boolean = false): Promise<boolean> {
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

  async <span class='method'>login</span>(email: string, password: string, persistence: Persistence = inMemoryPersistence): Promise&lt;LoginResult&gt; {
    return <span class='method'>setPersistence</span>(this.auth, persistence)
      .then(() =>
        <span class='method'>signInWithEmailAndPassword</span>(this.auth, email, password)
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
