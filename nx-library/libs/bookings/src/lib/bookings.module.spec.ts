import { async, TestBed } from '@angular/core/testing';
import { BookingsModule } from './bookings.module';

describe('BookingsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BookingsModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(BookingsModule).toBeDefined();
  });
});
