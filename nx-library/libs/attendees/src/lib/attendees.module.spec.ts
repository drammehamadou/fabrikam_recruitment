import { async, TestBed } from '@angular/core/testing';
import { AttendeesModule } from './attendees.module';

describe('AttendeesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AttendeesModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AttendeesModule).toBeDefined();
  });
});
