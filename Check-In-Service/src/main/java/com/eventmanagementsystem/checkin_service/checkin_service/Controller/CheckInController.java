package com.eventmanagementsystem.checkin_service.checkin_service.Controller;

import com.eventmanagementsystem.checkin_service.checkin_service.DTO.CheckInRequest;
import com.eventmanagementsystem.checkin_service.checkin_service.DTO.CheckInResponse;
import com.eventmanagementsystem.checkin_service.checkin_service.Entity.CheckIn;
import com.eventmanagementsystem.checkin_service.checkin_service.Service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/checkin")
public class CheckInController {

    @Autowired
    private CheckInService checkInService;

    /**
     * Process check-in for a ticket
     * POST /checkin
     * @param checkInRequest containing ticketId and eventId
     * @return CheckInResponse with check-in details
     */
    @PostMapping
    public ResponseEntity<CheckInResponse> checkIn(@RequestBody CheckInRequest checkInRequest) {
        try {
            CheckIn checkIn = checkInService.processCheckIn(checkInRequest);

            CheckInResponse response = new CheckInResponse(
                    checkIn.getCheckInId(),
                    checkIn.getTicketId(),
                    checkIn.getEventId(),
                    checkIn.getCheckInTimestamp(),
                    checkIn.getStatus(),
                    "Check-in successful"
            );

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Retrieve check-in details by ticket ID
     * GET /checkin/{ticketId}
     * @param ticketId the ticket ID
     * @return CheckInResponse with check-in details
     */
    @GetMapping("/{ticketId}")
    public ResponseEntity<CheckInResponse> getCheckInByTicket(@PathVariable Long ticketId) {
        try {
            CheckIn checkIn = checkInService.getCheckInByTicketId(ticketId);

            CheckInResponse response = new CheckInResponse(
                    checkIn.getCheckInId(),
                    checkIn.getTicketId(),
                    checkIn.getEventId(),
                    checkIn.getCheckInTimestamp(),
                    checkIn.getStatus(),
                    "Check-in details retrieved"
            );

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Retrieve check-in details by ticket ID and event ID
     * GET /checkin/{ticketId}/{eventId}
     * @param ticketId the ticket ID
     * @param eventId the event ID
     * @return CheckInResponse with check-in details
     */
    @GetMapping("/{ticketId}/{eventId}")
    public ResponseEntity<CheckInResponse> getCheckInByTicketAndEvent(
            @PathVariable Long ticketId,
            @PathVariable Long eventId) {
        try {
            CheckIn checkIn = checkInService.getCheckInByTicketAndEvent(ticketId, eventId);

            CheckInResponse response = new CheckInResponse(
                    checkIn.getCheckInId(),
                    checkIn.getTicketId(),
                    checkIn.getEventId(),
                    checkIn.getCheckInTimestamp(),
                    checkIn.getStatus(),
                    "Check-in details retrieved"
            );

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Check if a ticket is already checked in for an event
     * GET /checkin/verify/{ticketId}/{eventId}
     * @param ticketId the ticket ID
     * @param eventId the event ID
     * @return Map with isCheckedIn status
     */
    @GetMapping("/verify/{ticketId}/{eventId}")
    public ResponseEntity<Map<String, Object>> verifyCheckIn(
            @PathVariable Long ticketId,
            @PathVariable Long eventId) {
        try {
            boolean isCheckedIn = checkInService.isAlreadyCheckedIn(ticketId, eventId);

            Map<String, Object> response = new HashMap<>();
            response.put("ticketId", ticketId);
            response.put("eventId", eventId);
            response.put("isCheckedIn", isCheckedIn);
            response.put("message", isCheckedIn ? "Ticket is already checked in" : "Ticket is not checked in");

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    /**
     * Health check endpoint
     * @return Map with status
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Check-In-Service");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * Build error response
     */
    private ResponseEntity<CheckInResponse> buildErrorResponse(String message, HttpStatus status) {
        CheckInResponse errorResponse = new CheckInResponse();
        errorResponse.setMessage(message);
        return ResponseEntity.status(status).body(errorResponse);
    }
}

