package com.eventmanagementsystem.notification_service.notification_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

// Enables Netflix Eureka discovery for this service
@EnableDiscoveryClient
// Marks this as a Spring Boot application entry point
@SpringBootApplication
public class NotificationServiceApplication {

    // Standard Java main method to launch the Spring application
    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

}
