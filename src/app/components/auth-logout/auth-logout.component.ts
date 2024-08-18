import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginService } from '../../services/login.service';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-logout',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './auth-logout.component.html',
  styleUrl: '../code.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AuthLogoutComponent {

  constructor(
    private loginService: LoginService,
    public session: SessionService,
  ){}

  logout(){
    this.loginService.logout();
  }
  
  code_authComponent = `
export class AuthLogoutComponent {
  constructor(
    private loginService: LoginService,
    public session: SessionService,
  ){}

  logout(){
    this.loginService.logout();
  }
}
`;

code_loginService = `
export class LoginService {
  
  constructor(public authService: AuthService) { }
  
  <span class="comment">// En esta función podemos incluir un modal de confirmación antes de ejecutarla</span>
  <span class="comment">// o bien un mensaje de "Sesión cerrada" o una redirección después de ejecutarla.</span>
  logout(): void {
    this.authService.logout()
    .then(() => {
      this.notifier.popUpNotification("¡Esperamos verte de nuevo pronto!");
      this.router.navigateByUrl("auth/login");
    });
  }
}
`;

code_loginServicePlus = `
export class LoginService {
  
  constructor(public authService: AuthService) { }
  
  <span class="comment">// En este ejemplo hay un alert con SweetAlert para confirmar el cierre de sesión</span>
  <span class="comment">// y un mensaje de confirmación y una redirección después de realizar la acción.</span>
  logout(): void {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#42b54d",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar"
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
        .then(() => {
          this.notifier.popUpNotification("¡Esperamos verte de nuevo pronto!");
          this.router.navigateByUrl("auth/login");
        });
      }
    });
  }
}
`;


code_authService  = `
export class AuthService {
  
  constructor(private auth: Auth) { }

  async logout(): Promise&lt;void&gt; {
    return signOut(this.auth);
  }
}
`;
}
