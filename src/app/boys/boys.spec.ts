import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boys } from './boys';

describe('Boys', () => {
  let component: Boys;
  let fixture: ComponentFixture<Boys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boys],
    }).compileComponents();

    fixture = TestBed.createComponent(Boys);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
