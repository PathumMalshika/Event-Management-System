package com.eventmanagementsystem.checkin_service.checkin_service.Service;

import com.eventmanagementsystem.checkin_service.checkin_service.DTO.CheckInRequest;
import com.eventmanagementsystem.checkin_service.checkin_service.Entity.CheckIn;
import com.eventmanagementsystem.checkin_service.checkin_service.Exception.DuplicateCheckInException;
import com.eventmanagementsystem.checkin_service.checkin_service.Exception.InvalidCheckInException;
import com.eventmanagementsystem.checkin_service.checkin_service.Repository.CheckInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class CheckInServiceImpl implements CheckInService {

    @Autowired
    private CheckInRepository checkInRepository;

    @Override
    public CheckIn processCheckIn(CheckInRequest checkInRequest) {
        // Validate request
        if (Objects.isNull(checkInRequest) ||
            Objects.isNull(checkInRequest.getTicketId()) ||
            Objects.isNull(checkInRequest.getEventId())) {
            throw new InvalidCheckInException("Ticket ID and Event ID are required");
        }

        Long ticketId = checkInRequest.getTicketId();
        Long eventId = checkInRequest.getEventId();

        // Check if ticket ID and event ID are valid (positive numbers)
        if (ticketId <= 0 || eventId <= 0) {
            throw new InvalidCheckInException("Ticket ID and Event ID must be positive numbers");
        }

        // Check for duplicate check-in
        if (isAlreadyCheckedIn(ticketId, eventId)) {
            throw new DuplicateCheckInException(
                String.format("Ticket %d is already checked in for Event %d", ticketId, eventId)
            );
        }

        // Create new check-in record
        CheckIn checkIn = new CheckIn();
        checkIn.setTicketId(ticketId);
        checkIn.setEventId(eventId);
        checkIn.setCheckInTimestamp(LocalDateTime.now());
        checkIn.setStatus("CHECKED_IN");

        return checkInRepository.save(checkIn);
    }

    @Override
    public CheckIn getCheckInByTicketId(Long ticketId) {
        if (Objects.isNull(ticketId) || ticketId <= 0) {
            throw new InvalidCheckInException("Valid Ticket ID is required");
        }
        return checkInRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new InvalidCheckInException(
                        String.format("No check-in found for Ticket ID: %d", ticketId)
                ));
    }

    @Override
    public CheckIn getCheckInByTicketAndEvent(Long ticketId, Long eventId) {
        if (Objects.isNull(ticketId) || Objects.isNull(eventId) || ticketId <= 0 || eventId <= 0) {
            throw new InvalidCheckInException("Valid Ticket ID and Event ID are required");
        }
        return checkInRepository.findByTicketIdAndEventId(ticketId, eventId)
                .orElseThrow(() -> new InvalidCheckInException(
                        String.format("No check-in found for Ticket ID: %d and Event ID: %d", ticketId, eventId)
                ));
    }

    @Override
    public boolean isAlreadyCheckedIn(Long ticketId, Long eventId) {
        if (Objects.isNull(ticketId) || Objects.isNull(eventId) || ticketId <= 0 || eventId <= 0) {
            return false;
        }
        return checkInRepository.existsByTicketIdAndEventId(ticketId, eventId);
    }
}

