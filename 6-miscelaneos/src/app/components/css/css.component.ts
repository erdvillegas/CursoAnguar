import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-css',
  template: `
    <p>
      Hola Mundo
    </p>
  `,
  styles: [
    `
    p{
      color:red;
      font-sze: 20px;
    }
    `
  ]
})
export class CssComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
