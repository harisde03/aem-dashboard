import { Component, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { User } from '../../models/user';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartDonut: Chart[] = [];
  chartBar: Chart[] = [];
  users: User[] = [];

  constructor(private dashboardService: DashboardService) {}

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
        console.error('Failed to load dashboard data', err);
      },
    });
  }
}
