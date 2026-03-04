package com.eventmanagementsystem.checkin_service.checkin_service.Service;

import com.eventmanagementsystem.checkin_service.checkin_service.DTO.CheckInRequest;
import com.eventmanagementsystem.checkin_service.checkin_service.Entity.CheckIn;

public interface CheckInService {

    /**
     * Process check-in for a ticket at an event
     * @param checkInRequest the check-in request containing ticketId and eventId
     * @return CheckIn entity with updated status
     * @throws DuplicateCheckInException if ticket is already checked in
     * @throws InvalidCheckInException if validation fails
     */
    CheckIn processCheckIn(CheckInRequest checkInRequest);

    /**
     * Retrieve check-in details by ticket ID
     * @param ticketId the ticket ID
     * @return CheckIn entity
     */
    CheckIn getCheckInByTicketId(Long ticketId);

    /**
     * Retrieve check-in details by ticket ID and event ID
     * @param ticketId the ticket ID
     * @param eventId the event ID
     * @return CheckIn entity
     */
    CheckIn getCheckInByTicketAndEvent(Long ticketId, Long eventId);

    /**
     * Check if a ticket is already checked in for an event
     * @param ticketId the ticket ID
     * @param eventId the event ID
     * @return true if already checked in, false otherwise
     */
    boolean isAlreadyCheckedIn(Long ticketId, Long eventId);
}

