package com.EventManagementSystem.Venue_Service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

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

    @NotBlank(message = "City cannot be blank")
    @Size(max = 100)
    private String city;

    private int capacity = 100;

    @NotBlank(message = "Type cannot be blank")
    private String type;

    @NotBlank(message = "Status cannot be blank")
    private String status;

    @Email(message = "Invalid email")
    private String contact;

    public Venue() {}
}