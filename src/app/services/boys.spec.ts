import { TestBed } from '@angular/core/testing';

import { Boys } from './boys';

describe('Boys', () => {
  let service: Boys;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Boys);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
