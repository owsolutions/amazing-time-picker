import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  state,
  style,
  animate,
  transition,
  trigger
} from '@angular/animations';

interface RenderState {
  duration: number;
  content: any;
}
@Component({
  selector: 'app-snack-ad',
  templateUrl: './snack-ad.component.html',
  styleUrls: ['./snack-ad.component.scss'],
  animations: [
    trigger('showHide', [
      state(
        'hide',
        style({
          opacity: 0
        })
      ),
      state(
        'show',
        style({
          opacity: 1
        })
      ),
      transition('hide => show', [animate('0.3s')]),
      transition('show => hide', [animate('0.3s')])
    ])
  ]
})
export class SnackAdComponent implements OnInit {
  private stateIndex = 0;

  states: RenderState[] = [
    {
      duration: 3500,
      content: `
      <i class="icon-amazon"></i>
      <a href="https://web.pixelplux.com">Build microservice</a> from 40€ each service by us!`
    },
    {
      duration: 2500,
      content: `
      <i class="icon-clouds-flash-alt"></i>
      Web design with cutting edge tech <a href="https://web.pixelplux.com">only from 350€!</a>`
    },
    {
      duration: 5000,
      content: `
      <i class="icon-heart"></i>
      Amazing time picker loves you!`
    },
    {
      duration: 2000,
      content: `
      <i class="icon-rss"></i>
      We support Angular 2, 4, 5, 6, 7`
    },
    {
      duration: 5000,
      content: `
      <i class="icon-chat"></i>
      You can chat with us, click on the green box on the right side
      <i class="icon-angle-double-right"></i>`
    }
  ];
  public content: any = null;
  public visible = false;
  @HostBinding('class') public klass = 'snack-ad';
  constructor() {}

  ngOnInit() {
    this.viewSlide();
  }

  private viewSlide() {
    if (this.stateIndex === this.states.length - 1) {
      this.stateIndex = 0;
    } else {
      this.stateIndex++;
    }
    const state = this.states[this.stateIndex];
    this.renderState(state);

    setTimeout(() => {
      this.viewSlide();
    }, state.duration + 2000);
  }

  private renderState(state) {
    this.content = state.content;

    Observable.of(state).subscribe(data => {
      this.visible = false;
      this.content = data.content;
    });

    Observable.of(state)
      .delay(300)
      .subscribe(() => {
        this.visible = true;
      });

    Observable.of(state)
      .delay(state.duration + 600)
      .subscribe(data => {
        this.visible = false;
      });
  }
}
