import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListCardComponent } from './hotel-list-card.component';

describe('HotelListCardComponent', () => {
  let component: HotelListCardComponent;
  let fixture: ComponentFixture<HotelListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelListCardComponent]
    });
    fixture = TestBed.createComponent(HotelListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
