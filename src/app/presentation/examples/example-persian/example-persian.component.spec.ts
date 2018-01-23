import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePersianComponent } from './example-persian.component';

describe('ExamplePersianComponent', () => {
  let component: ExamplePersianComponent;
  let fixture: ComponentFixture<ExamplePersianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePersianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePersianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
