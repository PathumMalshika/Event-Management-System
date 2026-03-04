package com.EventManagementSystem.User_Service.controller;

import com.EventManagementSystem.User_Service.entity.User;
import com.EventManagementSystem.User_Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<User> fetchUserList() {
        return userService.fetchUserList();
    }

    @GetMapping("/{id}")
    public User fetchUserById(@PathVariable("id") Long userId) {
        return userService.fetchUserById(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteUserById(@PathVariable("id") Long userId) {
        userService.deleteUserById(userId);
        return "User Deleted Successfully";
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") Long userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }
}