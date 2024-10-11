import { TestBed } from '@angular/core/testing';

import { TrainApiSerService } from './train-api-ser.service';

describe('TrainApiSerService', () => {
  let service: TrainApiSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainApiSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
