package com.EventManagementSystem.Booking_Service.Service;

import com.EventManagementSystem.Booking_Service.Entity.Booking;
import com.EventManagementSystem.Booking_Service.Repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceImpl implements com.EventManagementSystem.Booking_Service.Service.BookingService {

    private final BookingRepository repository;

    public BookingServiceImpl(BookingRepository repository) {
        this.repository = repository;
    }

    @Override
    public Booking createBooking(Booking booking) {
        booking.setStatus("PENDING");
        booking.setBookingDate(LocalDateTime.now());
        return repository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return repository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<Booking> getByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public void deleteBooking(Long id) {
        repository.deleteById(id);
    }
}