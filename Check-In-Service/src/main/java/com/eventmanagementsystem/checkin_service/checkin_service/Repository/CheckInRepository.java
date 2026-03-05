package com.eventmanagementsystem.checkin_service.checkin_service.Repository;

import com.eventmanagementsystem.checkin_service.checkin_service.Entity.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

    /**
     * Find a check-in by ticketId and eventId
     * @param ticketId the ticket ID
     * @param eventId the event ID
     * @return Optional containing CheckIn if found
     */
    Optional<CheckIn> findByTicketIdAndEventId(Long ticketId, Long eventId);

    /**
     * Check if a check-in already exists for a ticket and event
     * @param ticketId the ticket ID
     * @param eventId the event ID
     * @return true if exists, false otherwise
     */
    boolean existsByTicketIdAndEventId(Long ticketId, Long eventId);

    /**
     * Find check-in by ticketId
     * @param ticketId the ticket ID
     * @return Optional containing CheckIn if found
     */
    Optional<CheckIn> findByTicketId(Long ticketId);
}

