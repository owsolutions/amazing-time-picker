import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwsTimePickerComponent } from './atp-time-picker.component';

describe('OwsTimePickerComponent', () => {
  let component: OwsTimePickerComponent;
  let fixture: ComponentFixture<OwsTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwsTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwsTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
