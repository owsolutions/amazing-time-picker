import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBasicComponent } from './layout-basic.component';

describe('LayoutBasicComponent', () => {
  let component: LayoutBasicComponent;
  let fixture: ComponentFixture<LayoutBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
