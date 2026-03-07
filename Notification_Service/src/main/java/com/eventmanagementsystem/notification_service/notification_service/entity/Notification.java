package com.eventmanagementsystem.notification_service.notification_service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment

    private Long id; // unique identifier for each notification

    private Long userId; // ID of the user the notification belongs to
    private String message; // notification content

    private Boolean read; // whether the notification has been viewed

    private LocalDateTime createdAt; // timestamp when notification was created

}
