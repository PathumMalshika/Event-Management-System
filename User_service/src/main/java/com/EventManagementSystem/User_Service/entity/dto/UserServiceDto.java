package com.EventManagementSystem.User_Service.entity.dto;

import lombok.Data;

@Data
public class UserServiceDto {
    private Long id;
    private String name;
    private String email;
    private String role;
}