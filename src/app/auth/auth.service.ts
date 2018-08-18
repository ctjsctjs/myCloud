import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router"

import { Authdata } from './auth-data.model';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/user/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  };

  getAuthStatus() {
    return this.isAuthenticated;
  };

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  };

  createUser(email: string, password: string) {
    const authData: Authdata = { email: email, password: password }
    this.http
      .post(BACKEND_URL + "signup", authData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  };

  login(email: string, password: string) {
    const authData: Authdata = { email: email, password: password }
    this.http
      .post<{ token: string, expiresIn: number }>(BACKEND_URL + "login", authData)
      .subscribe((responseData) => {
        const token = responseData.token;
        this.token = token;
        if (token) {
          const expiresInDuration = responseData.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate)
          this.router.navigate(['/dashboard']);
        } 
      });
  };

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true); 
    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
