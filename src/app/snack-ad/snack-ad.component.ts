import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-snack-ad',
  templateUrl: './snack-ad.component.html',
  styleUrls: ['./snack-ad.component.scss']
})
export class SnackAdComponent implements OnInit {
  @HostBinding('class') public klass = 'snack-ad';
  constructor() {}

  ngOnInit() {}
}
