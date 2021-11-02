import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsItemsComponent } from './trainings-items.component';

describe('TrainingsItemsComponent', () => {
  let component: TrainingsItemsComponent;
  let fixture: ComponentFixture<TrainingsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
