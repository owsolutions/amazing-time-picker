import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from '../../atp-library/atp-time-picker.service'; // this line you need

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  ngOnInit() {
  }

}
