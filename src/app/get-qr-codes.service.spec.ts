import { TestBed } from '@angular/core/testing';

import { GetQrCodesService } from './get-qr-codes.service';

describe('GetQrCodesService', () => {
  let service: GetQrCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetQrCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
