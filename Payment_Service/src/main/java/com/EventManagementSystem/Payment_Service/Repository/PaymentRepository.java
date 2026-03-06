package com.EventManagementSystem.Payment_Service.Repository;

import com.EventManagementSystem.Payment_Service.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUserId(Long userId);

    List<Payment> findByBookingId(Long bookingId);

    List<Payment> findByStatusIgnoreCase(String status);
}

