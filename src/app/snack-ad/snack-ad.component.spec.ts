import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackAdComponent } from './snack-ad.component';

describe('SnackAdComponent', () => {
  let component: SnackAdComponent;
  let fixture: ComponentFixture<SnackAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
