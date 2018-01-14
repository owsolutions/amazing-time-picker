import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input('tabTitle') tabTitle: string;
  @Input() active = false;
}
