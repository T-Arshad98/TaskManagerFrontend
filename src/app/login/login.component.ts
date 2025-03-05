import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
    <div class="container mt-5">
      <h2>Login with Google</h2>
      <button (click)="authService.googleLogin()" class="btn btn-primary">Login with Google</button>
    </div>
  `
})  
export class LoginComponent {
    authService: AuthService = inject(AuthService);

}