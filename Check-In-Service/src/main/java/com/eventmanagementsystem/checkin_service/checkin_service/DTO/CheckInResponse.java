package com.eventmanagementsystem.checkin_service.checkin_service.DTO;

import java.time.LocalDateTime;

public class CheckInResponse {

    private Long checkInId;
    private Long ticketId;
    private Long eventId;
    private LocalDateTime checkInTimestamp;
    private String status;
    private String message;

    public CheckInResponse() {
    }

    public CheckInResponse(Long checkInId, Long ticketId, Long eventId, LocalDateTime checkInTimestamp, String status, String message) {
        this.checkInId = checkInId;
        this.ticketId = ticketId;
        this.eventId = eventId;
        this.checkInTimestamp = checkInTimestamp;
        this.status = status;
        this.message = message;
    }

    public Long getCheckInId() {
        return checkInId;
    }

    public void setCheckInId(Long checkInId) {
        this.checkInId = checkInId;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public LocalDateTime getCheckInTimestamp() {
        return checkInTimestamp;
    }

    public void setCheckInTimestamp(LocalDateTime checkInTimestamp) {
        this.checkInTimestamp = checkInTimestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "CheckInResponse{" +
                "checkInId=" + checkInId +
                ", ticketId=" + ticketId +
                ", eventId=" + eventId +
                ", checkInTimestamp=" + checkInTimestamp +
                ", status='" + status + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}

