
import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { GoogleAuthProvider, User, browserSessionPersistence, setPersistence, signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afAuth: Auth) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.afAuth);
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.afAuth, browserSessionPersistence);
  }

  logout(): Observable<void> {
    const promise = signOut(this.afAuth).then(() => {
      sessionStorage.clear();
    });
    return from(promise);
  }

  getUser(): Observable<User | null> {
    return this.user$; // This will return the user object including UID
  }

  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    console.log('GoogleAuthProvider:', provider);
    try {
      const result = await signInWithPopup(this.afAuth, provider);
      const user = result.user;
      console.log('User logged in:', user);
      if (!user) {
        throw new Error('Google-Login error');
      }
    } catch (error) {
      console.error('Google-Login error:', error);
      throw error;
    }
  }

}