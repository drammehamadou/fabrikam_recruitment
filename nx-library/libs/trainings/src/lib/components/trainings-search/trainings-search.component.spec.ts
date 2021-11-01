import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsSearchComponent } from './trainings-search.component';

describe('TrainingsSearchComponent', () => {
  let component: TrainingsSearchComponent;
  let fixture: ComponentFixture<TrainingsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
