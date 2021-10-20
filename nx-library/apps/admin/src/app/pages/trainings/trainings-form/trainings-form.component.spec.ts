import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsFormComponent } from './trainings-form.component';

describe('TrainingsFormComponent', () => {
  let component: TrainingsFormComponent;
  let fixture: ComponentFixture<TrainingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
