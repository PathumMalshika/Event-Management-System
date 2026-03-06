package com.EventManagementSystem.Venue_Service.controller;

import com.EventManagementSystem.Venue_Service.entity.Venue;
import com.EventManagementSystem.Venue_Service.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:3000")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @PostMapping
    public ResponseEntity<String> addVenue(@Valid @RequestBody Venue venue) {
        venueService.addVenue(venue);
        return new ResponseEntity<>("Venue added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Venue venue = venueService.getVenueById(id);
        return new ResponseEntity<>(venue, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        List<Venue> venues = venueService.getAllVenues();
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateVenue(@PathVariable Long id, @RequestBody Venue venue) {
        Venue existing = venueService.getVenueById(id);
        if (existing != null) {
            existing.setName(venue.getName());
            existing.setCity(venue.getCity());
            existing.setCapacity(venue.getCapacity());
            existing.setType(venue.getType());
            existing.setStatus(venue.getStatus());
            existing.setContact(venue.getContact());
            venueService.addVenue(existing); // reuse addVenue for saving
            return new ResponseEntity<>("Venue updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Venue not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeVenue(@PathVariable Long id) {
        venueService.removeVenue(id);
        return new ResponseEntity<>("Venue removed successfully", HttpStatus.OK);
    }
}