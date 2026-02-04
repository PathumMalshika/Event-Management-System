package com.eventmanagementsystem.notification_service.notification_service.service;

import com.eventmanagementsystem.notification_service.notification_service.entity.Notification;
import com.eventmanagementsystem.notification_service.notification_service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repository;

    //create notification
    public Notification create (Notification notification){
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        return repository.save(notification);
    }

    //view notification
    public List<Notification> getByUser(Long userId){
        return repository.findByUserId(userId);
    }
}
