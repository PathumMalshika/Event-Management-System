package com.feedback_service.model;

import jakarta.persistence.*;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long eventId;
    private String comment;
    private LocalDateTime dateTime = LocalDateTime.now();

    public Feedback() {

    }

    public Long getId() { return id; }

    public Long getUserId() { return userId; }

    public Long getEventId() { return eventId; }

    public String getComment() { return comment; }

    public LocalDateTime getDateTime() { return dateTime; }

    public void setUserId(Long userId) { this.userId = userId; }

    public void setEventId(Long eventId) { this.eventId = eventId; }

    public void setComment(String comment) { this.comment = comment; }
}