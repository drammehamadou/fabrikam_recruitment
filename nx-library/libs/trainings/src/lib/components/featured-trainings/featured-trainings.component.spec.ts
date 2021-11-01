import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTrainingsComponent } from './featured-trainings.component';

describe('FeaturedTrainingsComponent', () => {
  let component: FeaturedTrainingsComponent;
  let fixture: ComponentFixture<FeaturedTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedTrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
