import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnDestroy {

  results: any[] = [
    {
      'name': 'Juego 1',
      'value': 23
    },
    {
      'name': 'Juego 2',
      'value': 13
    },
    {
      'name': 'Juego 4',
      'value': 27
    }
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  onSelect(event) {
    console.log(event);
  }

  intervalo: any;

  constructor() {

    const newResults = [...this.results];
    this.intervalo = setInterval(() => {
      for (let i in this.results) {
        newResults[i].value = Math.round(Math.random() * 100);
      }
      this.results = [...newResults];
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}
