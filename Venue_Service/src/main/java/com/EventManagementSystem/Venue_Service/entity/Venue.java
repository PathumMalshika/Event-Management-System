package com.EventManagementSystem.Venue_Service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
public class Venue {

    // Getters and Setters
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Getter
    @NotBlank(message = "Location cannot be blank")
    @Size(max = 200, message = "Location cannot exceed 200 characters")
    private String location;

    private int capacity;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private boolean isAvailable;

    // Default Constructor
    public Venue() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public void setLocation(String location) { this.location = location; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }


    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { this.isAvailable = available; }
}