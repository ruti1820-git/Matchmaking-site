import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Girls } from './girls';

describe('Girls', () => {
  let component: Girls;
  let fixture: ComponentFixture<Girls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Girls],
    }).compileComponents();

    fixture = TestBed.createComponent(Girls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
