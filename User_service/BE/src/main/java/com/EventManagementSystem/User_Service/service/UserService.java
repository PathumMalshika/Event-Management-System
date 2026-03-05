package com.EventManagementSystem.User_Service.service;

import com.EventManagementSystem.User_Service.entity.User;
import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> fetchUserList();

    User fetchUserById(Long userId);

    void deleteUserById(Long userId);

    User updateUser(Long userId, User user);
}