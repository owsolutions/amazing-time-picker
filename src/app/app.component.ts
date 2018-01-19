import { Component } from '@angular/core';
declare var require: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logo = require('./atp.png');
}

console.log('This is a real build!');