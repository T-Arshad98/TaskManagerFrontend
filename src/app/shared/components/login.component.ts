import { Component} from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor(private authService: AuthService) { }
    
    login() {
/*         this.authService.googleLogin().then(() => {
          console.log('User logged in');
        }).catch(error => {
          console.error('Login failed', error);
        }); */
      }
}