package com.eventmanagementsystem.notification_service.notification_service.controller;


import com.eventmanagementsystem.notification_service.notification_service.entity.Notification;
import com.eventmanagementsystem.notification_service.notification_service.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping
    public Notification create(@RequestBody Notification n) {
        return service.create(n);
    }

    @GetMapping
    public List<Notification> getAll() {
        return service.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return service.markAsRead(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
