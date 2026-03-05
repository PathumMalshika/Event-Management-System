package com.EventManagementSystem.User_Service.service.impl;

import com.EventManagementSystem.User_Service.entity.User;
import com.EventManagementSystem.User_Service.repository.UserRepository;
import com.EventManagementSystem.User_Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> fetchUserList() {
        return userRepository.findAll();
    }

    @Override
    public User fetchUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(Long userId, User user) {
        User userDB = userRepository.findById(userId).get();

        if (Objects.nonNull(user.getName()) && !"".equalsIgnoreCase(user.getName())) {
            userDB.setName(user.getName());
        }
        if (Objects.nonNull(user.getEmail()) && !"".equalsIgnoreCase(user.getEmail())) {
            userDB.setEmail(user.getEmail());
        }
        if (Objects.nonNull(user.getPassword()) && !"".equalsIgnoreCase(user.getPassword())) {
            userDB.setPassword(user.getPassword());
        }
        if (Objects.nonNull(user.getRole()) && !"".equalsIgnoreCase(user.getRole())) {
            userDB.setRole(user.getRole());
        }
        if (Objects.nonNull(user.getPhoneNumber()) && !"".equalsIgnoreCase(user.getPhoneNumber())) {
            userDB.setPhoneNumber(user.getPhoneNumber());
        }
        if (Objects.nonNull(user.getAddress()) && !"".equalsIgnoreCase(user.getAddress())) {
            userDB.setAddress(user.getAddress());
        }
        if (Objects.nonNull(user.getCity()) && !"".equalsIgnoreCase(user.getCity())) {
            userDB.setCity(user.getCity());
        }

        return userRepository.save(userDB);
    }
}