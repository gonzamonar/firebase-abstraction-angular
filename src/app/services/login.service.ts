import { Injectable } from '@angular/core';
import { browserLocalPersistence, inMemoryPersistence } from '@angular/fire/auth';
import { AuthService } from './firebase/auth.service';
import { LoaderService } from './loader.service';
import { NotifierService } from './notifier.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io

export interface RegisterResult {
  error: boolean;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public authService: AuthService,
    public loader: LoaderService,
    public notifier: NotifierService,
    public router: Router,
  ) { }
  
  async login(email: string, password: string, remember: boolean = false): Promise<boolean> {
    let persistence = remember ? browserLocalPersistence : inMemoryPersistence ;
    this.loader.setLoading(true);

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

  async register(email: string, password: string, sendVerificationEmail: boolean = false, loginOnRegister: boolean = true): Promise<RegisterResult> {
    this.loader.setLoading(true);
    
    return this.authService.register(email, password, sendVerificationEmail, loginOnRegister)
    .then((res) => {
      this.loader.setLoading(false);
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
