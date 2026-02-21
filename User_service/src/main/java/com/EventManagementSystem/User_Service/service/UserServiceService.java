package com.EventManagementSystem.User_Service.service;

import com.EventManagementSystem.User_Service.entity.dto.UserServiceDto;
import java.util.List;

public interface UserServiceService {
    UserServiceDto createUser(UserServiceDto dto);
    List<UserServiceDto> getAllUsers();
    UserServiceDto updateUser(Long id, UserServiceDto dto);
    void deleteUser(Long id);
}