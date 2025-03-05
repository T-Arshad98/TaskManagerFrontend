import { Component} from '@angular/core';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor() { }
    
    login() {
/*         this.authService.googleLogin().then(() => {
          console.log('User logged in');
        }).catch(error => {
          console.error('Login failed', error);
        }); */
      }
}