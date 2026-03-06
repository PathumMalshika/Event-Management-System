package com.EventManagementSystem.Venue_Service.repository;

import com.EventManagementSystem.Venue_Service.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
}