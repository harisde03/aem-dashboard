import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit {
  @Input() title: string = 'Card Title';
  @Input() data: Chart[] = [
    { name: 'Category 1', value: 30 },
    { name: 'Category 2', value: 40 },
    { name: 'Category 3', value: 25 },
    { name: 'Category 4', value: 35 },
  ];

  constructor() {}

  ngOnInit(): void {
    this.chartOptions.series = this.data.map((item) => item.value);
    this.chartOptions.labels = this.data.map((item) => item.name);
  }

  public chartOptions = {
    series: [] as number[],
    labels: [] as string[],

    chart: {
      type: 'donut' as const,
      animations: { enabled: true },
      height: 350,
    },

    dataLabels: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        donut: {
          size: '50%',
        }
      },
    },

    legend: {
      show: true,
      position: 'right' as const,
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom' as const,
          },
        },
      },
    ],

    tooltip: {
      enabled: true,
    },
  };
}
