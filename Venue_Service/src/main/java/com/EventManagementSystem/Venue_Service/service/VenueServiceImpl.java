package com.EventManagementSystem.Venue_Service.service;

import com.EventManagementSystem.Venue_Service.entity.Venue;
import com.EventManagementSystem.Venue_Service.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VenueServiceImpl implements VenueService {

    @Autowired
    private VenueRepository venueRepository;

    @Override
    public void addVenue(Venue venue) {
        venueRepository.save(venue);
    }

    @Override
    public Venue getVenueById(Long id) {
        Optional<Venue> venue = venueRepository.findById(id);
        return venue.orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    @Override
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    @Override
    public void updateVenue(Long id, Venue venue) {
        if (venueRepository.existsById(id)) {
            venue.setId(id);
            venueRepository.save(venue);
        } else {
            throw new RuntimeException("Venue not found");
        }
    }

    @Override
    public void removeVenue(Long id) {
        if (venueRepository.existsById(id)) {
            venueRepository.deleteById(id);
        } else {
            throw new RuntimeException("Venue not found");
        }
    }
}