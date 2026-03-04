package com.eventmanagementsystem.checkin_service.checkin_service.DTO;

import java.time.LocalDateTime;

public class CheckInRequest {

    private Long ticketId;
    private Long eventId;

    public CheckInRequest() {
    }

    public CheckInRequest(Long ticketId, Long eventId) {
        this.ticketId = ticketId;
        this.eventId = eventId;
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

    @Override
    public String toString() {
        return "CheckInRequest{" +
                "ticketId=" + ticketId +
                ", eventId=" + eventId +
                '}';
    }
}

