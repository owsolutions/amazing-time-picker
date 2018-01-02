import { TestBed, inject } from '@angular/core/testing';

import { AtpTimePickerService } from './atp-time-picker.service';

describe('AtpTimePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtpTimePickerService]
    });
  });

  it('should be created', inject([AtpTimePickerService], (service: AtpTimePickerService) => {
    expect(service).toBeTruthy();
  }));
});
