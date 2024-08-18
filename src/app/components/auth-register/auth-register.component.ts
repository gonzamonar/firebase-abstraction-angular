import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
  ],
  templateUrl: './auth-register.component.html',
  styleUrl: '../code.component.css',
  encapsulation: ViewEncapsulation.None
})

export class AuthRegisterComponent {
  // Variables del componente
  email: string = '';
  password: string = '';
  sendVerification: boolean = false;
  loginOnRegister: boolean = true;

  registerError: boolean = false;
  errorMsg: string = "";


  // Inyectamos nuestro servicio de login y de sesión en el constructor
  constructor(
    private loginService: LoginService,
    public session: SessionService,
  ){}


  // Utilizamos el llamado a la función de registro del loginService y obtenemos el resultado
  register() {
    this.registerError = false;

    this.loginService.register(this.email, this.password, this.sendVerification, this.loginOnRegister)
    .then(
      (res) => {
        this.registerError = res.error;
        this.errorMsg = res.msg;
      }
    );
  }

  code_authComponent = `
export class AuthRegisterComponent {
  <span class="comment">// Variables del componente</span>
  email: string = '';
  password: string = '';
  sendVerification: boolean = false;
  loginOnRegister: boolean = true;

  registerError: boolean = false;
  errorMsg: string = "";


  <span class="comment">// Inyectamos nuestro servicio de login y de sesión en el constructor</span>
  constructor(
    private loginService: LoginService,
    public session: SessionService,
  ){}


  <span class="comment">// Utilizamos el llamado a la función de registro del loginService y obtenemos el resultado</span>
  register() {
    this.registerError = false;

    this.loginService.register(this.email, this.password, this.sendVerification, this.loginOnRegister)
    .then(
      (res) => {
        this.registerError = res.error;
        this.errorMsg = res.msg;
      }
    );
  }
}
`;

code_loginService = `
export class LoginService {
  
  <span class="comment">// Inyectamos el servicio de abstracción de Auth-Firebase y el Loader del spinner</span>
  constructor(
    public authService: AuthService,
    public loader: LoaderService
  ) { }
  
  async register(email: string, password: string,
                 sendVerificationEmail: boolean = false,
                 loginOnRegister: boolean = true): Promise&lt;RegisterResult&gt; {
    <span class="highlight">this.loader.setLoading(true);</span>
    
    <span class="comment">// Llamamos a la función register de Auth y, en función del resultado,</span>
    <span class="comment">// generamos un mensaje de error para mostrar en nuestro component</span>
    return this.authService.register(email, password, sendVerificationEmail, loginOnRegister)
    .then((res) => {
      <span class="highlight">this.loader.setLoading(false);</span>
      let result: RegisterResult;
      if (res.error){
        if (res.msg == "auth/email-already-in-use" || res.msg == "auth/email-already-exists") {
          result = { error: true, msg: "Ya existe una cuenta con ese email." };
        } else if (res.msg.includes("email")) {
          result = { error: true, msg: "El email ingresado es inválido." };
        } else if (res.msg == "auth/weak-password") {
          result = { error: true, msg: "La contraseña es muy débil." };
        } else if (res.msg.includes("password")){
          result = { error: true, msg: "La contraseña ingresada es inválida." };
        } else {
          result = { error: true, msg: "Datos inválidos." };
        }
        return result;
      } else {
        return { error: false, msg: "Registro exitoso." };
      }
    });
  }
}
`;


code_authService  = `
<span class="comment">// Utilizamos una interfaz para tener un output consistente del resultado.</span>
export interface RegisterResult {
  error: boolean;
  msg: string;
}

export class AuthService {
  
  constructor(private auth: Auth) { }

  async register(email: string, pwd: string,
                 sendVerificationEmail: boolean = false,
                 loginOnRegister: boolean = true): Promise&lt;RegisterResult&gt; {
    let result: RegisterResult = { error: true, msg: "Failed register." };
    let currentUser = this.auth.currentUser;

    return createUserWithEmailAndPassword(this.auth, email, pwd)
    .then(
      async (response) => {
        <span class="comment">// En la respuesta, realizamos los pasos de envío de email de verificación</span>
        <span class="comment">//  o restablecemos la sesión en función de las flags introducidas en los parámetros</span>
        if (response.user !== null){
          result = { error: false, msg: "Successfull register." };
        }

        if (sendVerificationEmail && response.user.email !== null) {
          await sendEmailVerification(response.user);
        }

        if (!loginOnRegister) {
          await this.auth.updateCurrentUser(currentUser);
        }

        return result;
      }).catch((e) => {
        result.msg = e.code;
        return result
      });
  }
}
`;
}
