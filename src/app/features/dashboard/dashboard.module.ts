import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TimeAgoPipe } from './pipes/time-ago.pipe';


@NgModule({
  declarations: [
    DonutChartComponent,
    BarChartComponent,
    DashboardComponent,
    UserTableComponent,
    HeaderComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
