import { TestBed, inject } from '@angular/core/testing';

import { AtpCoreService } from './atp-core.service';

describe('AtpCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtpCoreService]
    });
  });

  it('should be created', inject([AtpCoreService], (service: AtpCoreService) => {
    expect(service).toBeTruthy();
  }));
});
