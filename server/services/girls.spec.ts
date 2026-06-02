import { TestBed } from '@angular/core/testing';

import { Girls } from './girls';

describe('Girls', () => {
  let service: Girls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Girls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
