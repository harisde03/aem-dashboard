import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from '../../models/chart';
import { User } from '../../models/user';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string = '';

  chartDonut: Chart[] = [];
  chartBar: Chart[] = [];
  users: User[] = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (response) => {
        if (response.success) {
          this.chartDonut = response.chartDonut;
          this.chartBar = response.chartBar;
          this.users = response.tableUsers;
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Session expired. Please log in again.';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);

          return;
        }

        this.errorMessage = 'Could not load dashboard.';
      },
    });
  }
}
