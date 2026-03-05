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

@Getter
@Setter
@Entity
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Location cannot be blank")
    @Size(max = 200)
    private String location;

    private int capacity;

    @NotNull
    private LocalDate date;

    private boolean isAvailable;

    public Venue() {}
}