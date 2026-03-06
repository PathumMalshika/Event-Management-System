package com.EventManagementSystem.Venue_Service.service;

import com.EventManagementSystem.Venue_Service.entity.Venue;

import java.util.List;

public interface VenueService {
    void addVenue(Venue venue);
    Venue getVenueById(Long id);
    List<Venue> getAllVenues();
    void updateVenue(Long id, Venue venue);
    void removeVenue(Long id);
}