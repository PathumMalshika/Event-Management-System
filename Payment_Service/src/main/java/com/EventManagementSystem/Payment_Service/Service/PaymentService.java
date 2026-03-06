package com.EventManagementSystem.Payment_Service.Service;

import com.EventManagementSystem.Payment_Service.Entity.Payment;

import java.util.List;

public interface PaymentService {

    Payment create(Payment payment);

    List<Payment> getAll();

    Payment getById(Long id);

    List<Payment> getByUserId(Long userId);

    List<Payment> getByBookingId(Long bookingId);

    Payment update(Long id, Payment updated);

    Payment updateStatus(Long id, String status);

    void delete(Long id);

    int deleteFailedPayments();
}

