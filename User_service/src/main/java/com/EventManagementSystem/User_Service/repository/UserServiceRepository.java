package com.EventManagementSystem.User_Service.repository;

import com.EventManagementSystem.User_Service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserServiceRepository extends JpaRepository<User, Long> {
}