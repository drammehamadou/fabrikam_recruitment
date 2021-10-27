import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesFormComponent } from './attendees-form.component';

describe('AttendeesFormComponent', () => {
  let component: AttendeesFormComponent;
  let fixture: ComponentFixture<AttendeesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
