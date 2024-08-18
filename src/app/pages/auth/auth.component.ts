import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faArrowRightToBracket, faCircleUser, faRightToBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FontAwesomeModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  iconLogin: IconDefinition = faArrowRightToBracket;
  iconRegister: IconDefinition = faCircleUser;
  iconLogout: IconDefinition = faArrowRightFromBracket;
}
