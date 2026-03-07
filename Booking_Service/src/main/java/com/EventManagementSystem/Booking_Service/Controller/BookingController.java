package com.EventManagementSystem.Booking_Service.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EventManagementSystem.Booking_Service.Entity.Booking;
import com.EventManagementSystem.Booking_Service.Service.BookingService;

// Allow requests from React frontend
@CrossOrigin(origins = "http://localhost:3000")

// REST controller that handles HTTP requests
// Base path for all endpoints in this controller is /bookings
@RestController
@RequestMapping("/bookings")
public class BookingController {

    // Inject the BookingService to handle business logic
    @Autowired
    private final BookingService service;

    // Constructor to initialize the BookingService dependency
    public BookingController(BookingService service) {
        this.service = service;
    }

    // Endpoint to create a new booking (HTTP POST)
    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        return service.createBooking(booking);
    }

    // Endpoint to get all bookings (HTTP GET)
    @GetMapping
    public List<Booking> getAll() {
        return service.getAllBookings();
    }

    // Endpoint to get a booking by its ID (HTTP GET)
    @GetMapping("/{id}")
    public Booking getById(@PathVariable Long id) {
        return service.getBookingById(id);
    }

    // Endpoint to get all bookings for a specific user (HTTP GET)
    @GetMapping("/user/{userId}")
    public List<Booking> getByUser(@PathVariable Long userId) {
        return service.getByUserId(userId);
    }

    // Endpoint to delete a booking by its ID (HTTP DELETE)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteBooking(id);
    }
}