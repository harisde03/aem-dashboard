import { Component, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { User } from '../../models/user';
import { DashboardService } from '../../services/dashboard.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = false;

  chartDonut: Chart[] = [];
  chartBar: Chart[] = [];
  users: User[] = [];

  lastUpdated: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.dashboardService.getDashboardData().pipe(finalize(() => { this.isLoading = false })).subscribe({
      next: (response) => {
        if (response.success) {
          this.chartDonut = response.chartDonut;
          this.chartBar = response.chartBar;
          this.users = response.tableUsers;
          this.lastUpdated = response.lastUpdated;
        }
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }
}
