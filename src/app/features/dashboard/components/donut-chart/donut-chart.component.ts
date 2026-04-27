import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from '../../models/chart';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnChanges {
  @Input() title: string = 'Card Title';
  @Input() data: Chart[] = [];
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.chartOptions.series = this.data.map((item) => item.value);
      this.chartOptions.labels = this.data.map((item) => item.name);
    }
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
