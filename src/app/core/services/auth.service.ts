import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { DbService } from './db.service';
import { AuthDocument } from '../models/auth-document';

interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly passwordSalt = environment.salt;

  constructor(
    private tokenService: TokenService,
    private dbService: DbService,
    private http: HttpClient
  ) {}

  login(credentials: LoginCredentials): Observable<string> {
    return this.loginOnline(credentials).pipe(
      catchError(err => {
        if (err.code === 'SERVER_ERROR') return this.loginOffline(credentials);
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    this.tokenService.destroyToken();
  }

  private loginOnline(credentials: LoginCredentials): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/account/login`, credentials).pipe(
      catchError(err => {
        if (err.status === 401) {
          return throwError(() => ({ code: 'INVALID_CREDENTIALS', message: 'These credentials do not match our records.' }));
        }
        return throwError(() => ({ code: 'SERVER_ERROR', message: 'Unable to reach the server.' }));
      }),
      switchMap(token => {
        if (token) return this.saveAuthDocument(credentials, token).pipe(map(() => token));
        return throwError(() => ({ code: 'NO_TOKEN', message: 'No token received.' }));
      }),
      tap(token => this.tokenService.saveToken(token))
    );
  }

  private loginOffline(credentials: LoginCredentials): Observable<string> {
    const id = this.generateId(credentials.username);

    return from(this.hashPassword(credentials.password)).pipe(
      switchMap(hashedPassword =>
        this.dbService.getDocument<AuthDocument>(id).pipe(
          map(existingDocument => ({ hashedPassword, existingDocument }))
        )
      ),
      switchMap(({ hashedPassword, existingDocument }) => {
        if (existingDocument && existingDocument.password === hashedPassword) {
          this.tokenService.saveToken(existingDocument.token);
          return of(existingDocument.token);
        }
        return throwError(() => ({ code: 'OFFLINE_ERROR', message: 'Credentials do not match any stored user.' }));
      })
    );
  }

  private saveAuthDocument(credentials: LoginCredentials, token: string): Observable<AuthDocument> {
    const id = this.generateId(credentials.username);

    return from(this.hashPassword(credentials.password)).pipe(
      switchMap(hashedPassword => 
        this.dbService.getDocument<AuthDocument>(id).pipe(
          map(existingDocument => ({ hashedPassword, existingDocument }))
        )
      ),
      switchMap(({ hashedPassword, existingDocument }) => {
        return this.dbService.saveDocument<AuthDocument>({
          _id: id,
          ...(existingDocument?._rev && { _rev: existingDocument._rev }),
          username: credentials.username,
          password: hashedPassword,
          token,
          lastLogin: new Date().toISOString(),
        });
      })
    );
  }

  private generateId(username: string): string {
    return `auth_${username.toLowerCase().trim()}`;
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder    = new TextEncoder();
    const data       = encoder.encode(password + this.passwordSalt);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray  = Array.from(new Uint8Array(hashBuffer));
    const hashHex    = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
  }
}
