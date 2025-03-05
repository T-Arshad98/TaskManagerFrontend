import { Component, inject, Optional, REQUEST, REQUEST_CONTEXT } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
    <div class="container mt-5">
      <h2>Login with Google</h2>
      <button (click)="login()" class="btn btn-primary">Login with Google</button>
    </div>
  `
})
export class LoginComponent {
    constructor(private authService: AuthService) { }
    
    login() {
        this.authService.googleLogin().then(() => {
          console.log('User logged in');
        }).catch(error => {
          console.error('Login failed', error);
        });
      }
}