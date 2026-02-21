package com.EventManagementSystem.User_Service.controller;

import com.EventManagementSystem.User_Service.entity.dto.UserServiceDto;
import com.EventManagementSystem.User_Service.service.UserServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserServiceController {

    private final UserServiceService userService;

    @PostMapping
    public ResponseEntity<UserServiceDto> createUser(@RequestBody UserServiceDto dto) {
        return ResponseEntity.ok(userService.createUser(dto));
    }

    @GetMapping
    public ResponseEntity<List<UserServiceDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserServiceDto> updateUser(@PathVariable Long id, @RequestBody UserServiceDto dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}