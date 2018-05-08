import { TestBed, inject } from '@angular/core/testing';

import { AmazingTimePickerService } from './atp-time-picker.service';

describe('AtpTimePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmazingTimePickerService]
    });
  });

  it('should be created', inject([AmazingTimePickerService], (service: AmazingTimePickerService) => {
    expect(service).toBeTruthy();
  }));
});
