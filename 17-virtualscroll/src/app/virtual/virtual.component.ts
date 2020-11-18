import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {

  personas = Array(500).fill(Math.round(Math.random() * 100));

  constructor() { }

  ngOnInit(): void {

    console.log(this.personas);
  }

}
