import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from '../models/chart';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

export interface DashboardApiResponse {
  success: boolean;
  chartDonut: Chart[];
  chartBar: Chart[];
  tableUsers: User[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardApiResponse> {
    return this.http.get<DashboardApiResponse>(this.apiUrl + '/dashboard');
  }
}
