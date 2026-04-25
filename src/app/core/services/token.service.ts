import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenKey = 'APP_TOKEN';

  getToken(): string | null {
    return window.localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    window.localStorage.setItem(this.tokenKey, token);
  }

  destroyToken(): void {
    window.localStorage.removeItem(this.tokenKey);
  }
}
