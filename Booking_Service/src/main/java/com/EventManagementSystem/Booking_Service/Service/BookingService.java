package com.EventManagementSystem.Booking_Service.Service;

import com.EventManagementSystem.Booking_Service.Entity.Booking;
import java.util.List;

public interface BookingService {

    Booking createBooking(Booking booking);

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    List<Booking> getByUserId(Long userId);

    void deleteBooking(Long id);
}