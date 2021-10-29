import { BookingItem } from './booking-item';
import { Attendee } from '@nx-library/attendees';

export class Booking {
  id?: string;
  bookingItems?: BookingItem;
  address1?: string;
  address2?: string;
  county?: string;
  postCode?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  attendee?: Attendee;
  dateBooked?: string;
}
