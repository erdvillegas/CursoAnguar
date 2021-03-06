import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountryResponse } from '../models/country-response';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  paises: CountryResponse[] = [];

  constructor(private httpcliente: HttpClient) { }

  ngOnInit(): void {
    this.httpcliente.get<CountryResponse[]>('https://restcountries.eu/rest/v2/lang/es').subscribe(paises => {
      this.paises = paises;
    });
  }

  drop(evento: CdkDragDrop<CountryResponse>) {
    moveItemInArray(this.paises, evento.previousIndex, evento.currentIndex);
  }

}
