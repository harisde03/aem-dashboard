import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<string> {
    return this.http.post<string>(this.apiUrl + '/account/login', credentials).pipe(
      tap((response) => {
        if (response) this.tokenService.saveToken(response);
      })
    );
  }

  logout(): void {
    this.tokenService.destroyToken();
  }
}
