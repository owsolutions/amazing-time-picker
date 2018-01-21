import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleArabicComponent } from './example-arabic.component';

describe('ExampleArabicComponent', () => {
  let component: ExampleArabicComponent;
  let fixture: ComponentFixture<ExampleArabicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleArabicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
