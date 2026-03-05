package com.EventManagementSystem.User_Service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String role;
    private String phoneNumber;
    private String address;
    private String city;

    // Id
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // Name
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    // Email
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // Password
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // Role
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCity() {
            return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}