import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Chart } from '../models/chart';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { DashboardDataDocument } from '../models/dashboard-data-document';
import { DbService } from 'src/app/core/services/db.service';

interface DashboardData {
  success: boolean;
  chartDonut: Chart[];
  chartBar: Chart[];
  tableUsers: User[];
  lastUpdated: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = environment.apiUrl;
  private readonly docId = 'dashboard_data';
  private dbService = inject(DbService);

  constructor(private http: HttpClient) {}
  
  getDashboardData(): Observable<DashboardData> {
    return this.onlineDashboardData().pipe(
      catchError(err => {
        if (err.code === 'SERVER_ERROR') return this.offlineDashboardData();
        return throwError(() => err);
      })
    )
  }

  private onlineDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/dashboard`).pipe(
      catchError(err => {
        if (err.status === 401) {
          return throwError(() => ({ code: 'INVALID_CREDENTIALS', message: 'Session expired. Please sign in again.' }));
        }
        return throwError(() => ({ code: 'SERVER_ERROR', message: 'Unable to reach the server.' }));
      }),
      switchMap(data => {
        if (data && data.success) return this.saveDashboardDataDocument(data).pipe(map(() => data));
        return throwError(() => ({ code: 'NO_DATA', message: 'No data are received.' }));
      })
    );
  }

  private offlineDashboardData(): Observable<DashboardData> {
    return this.dbService.getDocument<DashboardDataDocument>(this.docId).pipe(
      switchMap(doc => {
        if (!doc) return throwError(() => new Error('NO_OFFLINE_DATA'));
        return of({ ...doc, success: true });
      })
    );
  }

  private saveDashboardDataDocument(dashboardData: DashboardData): Observable<DashboardDataDocument> {
    return this.dbService.getDocument<DashboardDataDocument>(this.docId).pipe(
      switchMap(existingDocument => {
        return this.dbService.saveDocument<DashboardDataDocument>({
          ...dashboardData,
          _id: this.docId,
          ...(existingDocument?._rev && { _rev: existingDocument._rev }),
          lastUpdated: new Date().toISOString(),
        });
      })
    );
  }
}
