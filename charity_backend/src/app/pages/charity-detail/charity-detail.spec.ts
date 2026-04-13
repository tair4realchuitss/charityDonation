import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityDetailComponent } from './charity-detail';

describe('CharityDetail', () => {
  let component: CharityDetailComponent;
  let fixture: ComponentFixture<CharityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharityDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
