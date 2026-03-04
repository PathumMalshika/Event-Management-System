package com.feedback_service.model;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class feedback {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long userId;
    private Long eventId;
    private String comment;
    private LocalDateTime dateTime;


    public feedback() {}


    public feedback(Long userId, Long eventId, String comment) {
        this.userId = userId;
        this.eventId = eventId;
        this.comment = comment;
        this.dateTime =  LocalDateTime.now();
    }


    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getComment() {
        return comment;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }







}
