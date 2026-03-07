package com.eventmanagementsystem.notification_service.notification_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmanagementsystem.notification_service.notification_service.entity.Notification;
import com.eventmanagementsystem.notification_service.notification_service.service.NotificationService;

//REST controller class where every method returns a domain object
@RestController
// Allow CORS requests from the frontend running on localhost:3000
@CrossOrigin(origins = "http://localhost:3000")
// Base URL path for all notification-related endpoints
@RequestMapping("/notifications")
public class NotificationController {

    // Service layer dependency to perform business logic for notifications
    private final NotificationService service;

    // Constructor injection of the NotificationService
    public NotificationController(NotificationService service) {
        this.service = service;
    }

    // Create a new notification via HTTP POST with JSON body
    @PostMapping
    public Notification create(@RequestBody Notification n) {
        return service.create(n);
    }

    // Retrieve all notifications via HTTP GET
    @GetMapping
    public List<Notification> getAll() {
        return service.getAll();
    }

    // Get notifications for a specific user by their ID
    @GetMapping("/user/{userId}")
    public List<Notification> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    // Mark a notification as read; uses HTTP PUT on the notification ID
    @PutMapping("/{id}")
    public Notification markAsRead(@PathVariable Long id) {
        return service.markAsRead(id);
    }

    // Delete a notification by ID using HTTP DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
