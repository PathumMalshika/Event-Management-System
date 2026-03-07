package com.eventmanagementsystem.notification_service.notification_service.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmanagementsystem.notification_service.notification_service.entity.Notification;
import com.eventmanagementsystem.notification_service.notification_service.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired // inject the JPA repository
    private NotificationRepository repository;

    // Create a new notification, initialize metadata, and persist
    public Notification create(Notification notification) {
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        return repository.save(notification);
    }

    // Retrieve all notifications from the database
    public List<Notification> getAll() {
        return repository.findAll();
    }

    // Get notifications belonging to a specific user
    public List<Notification> getByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    // Mark a notification as read by updating its flag
    public Notification markAsRead(Long id) {
        Notification n = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setRead(true);
        return repository.save(n);
    }

    // Delete a notification record by its ID
    public void delete(Long id) {
        repository.deleteById(id);
    }
}

