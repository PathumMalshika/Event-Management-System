package com.eventmanagementsystem.checkin_service.checkin_service.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "check_in")
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long checkInId;

    @Column(nullable = false)
    private Long ticketId;

    @Column(nullable = false)
    private Long eventId;

    @Column(nullable = false)
    private LocalDateTime checkInTimestamp;

    @Column(nullable = false)
    private String status;

    public CheckIn() {
    }

    public CheckIn(Long ticketId, Long eventId, LocalDateTime checkInTimestamp, String status) {
        this.ticketId = ticketId;
        this.eventId = eventId;
        this.checkInTimestamp = checkInTimestamp;
        this.status = status;
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

    @Override
    public String toString() {
        return "CheckIn{" +
                "checkInId=" + checkInId +
                ", ticketId=" + ticketId +
                ", eventId=" + eventId +
                ", checkInTimestamp=" + checkInTimestamp +
                ", status='" + status + '\'' +
                '}';
    }
}

