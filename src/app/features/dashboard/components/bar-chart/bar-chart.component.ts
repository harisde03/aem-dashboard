import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() title: string = 'Card Title';
  @Input() data: Chart[] = [
    { name: 'Category 1', value: 30 },
    { name: 'Category 2', value: 40 },
    { name: 'Category 3', value: 25 },
    { name: 'Category 4', value: 35 },
    { name: 'Category 5', value: 45 },
  ];

  constructor() {}

  ngOnInit(): void {
    this.chartOptions.series = [
      {
        name: this.title,
        data: this.data.map((item) => item.value),
      },
    ];
    this.chartOptions.xaxis.categories = this.data.map((item) => item.name);
  }

  public chartOptions = {
    series: [] as { name: string; data: number[] }[],

    xaxis: {
      categories: [] as string[]
    },

    chart: {
      type: 'bar' as const,
      height: 350,
      fontFamily: 'inherit',
      toolbar: { show: false },
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%'
      },
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: '#f1f3f4'
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: '10px',
              },
            },
          },
        },
      },
    ],
  };
}
