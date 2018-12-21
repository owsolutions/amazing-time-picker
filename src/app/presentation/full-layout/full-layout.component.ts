import { Component, OnInit } from '@angular/core';
declare var require: any;
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
  logo = require('../../atp.png');

  constructor() {}

  ngOnInit() {}
}
