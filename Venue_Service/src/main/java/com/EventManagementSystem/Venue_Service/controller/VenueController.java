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
@CrossOrigin(origins = "http://localhost:5174")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @PostMapping
    public ResponseEntity<String> addVenue(@RequestBody Venue venue) {
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
        venueService.updateVenue(id, venue);
        return new ResponseEntity<>("Venue updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeVenue(@PathVariable Long id) {
        venueService.removeVenue(id);
        return new ResponseEntity<>("Venue removed successfully", HttpStatus.OK);
    }
}